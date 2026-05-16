import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Plane, Car, Train, Navigation, Info, Search, Sparkles, ShieldCheck, ArrowRight, Globe, Map as MapIcon, AlertTriangle } from 'lucide-react';
import { APIProvider, Map, useMap, useMapsLibrary, AdvancedMarker, Pin, Marker } from '@vis.gl/react-google-maps';
import { MOCK_CITIES } from '../constants';
import { City } from '../types';
import { getSupabase } from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';

const API_KEY =
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (process.env as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const MAP_ID = (import.meta as any).env?.VITE_GOOGLE_MAPS_MAP_ID || 
               (process.env as any).VITE_GOOGLE_MAPS_MAP_ID || 
               null;

const hasValidKey = Boolean(API_KEY) && 
                   API_KEY !== 'YOUR_API_KEY' && 
                   API_KEY !== 'undefined' && 
                   API_KEY.length > 10;

function RouteDisplay({ origin, destination, destinationCoords, onRouteFound, onError }: {
  origin: string;
  destination: string;
  destinationCoords?: { lat: number, lng: number };
  onRouteFound: (data: { distance: string; duration: string; isFlight: boolean }) => void;
  onError: (msg: string) => void;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const geocodingLib = useMapsLibrary('geocoding');
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const flightPathRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!routesLib || !geocodingLib || !map || !origin || !destination) return;
    
    // Clear previous
    if (rendererRef.current) {
      rendererRef.current.setMap(null);
      rendererRef.current = null;
    }
    if (flightPathRef.current) {
      flightPathRef.current.setMap(null);
      flightPathRef.current = null;
    }

    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#fbbf24',
        strokeWeight: 6,
        strokeOpacity: 0.8
      }
    });
    rendererRef.current = renderer;

    // Try driving first
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        renderer.setDirections(result);
        const route = result.routes[0].legs[0];
        
        onRouteFound({
          distance: route.distance?.text || 'Unknown',
          duration: route.duration?.text || 'Unknown',
          isFlight: false
        });
      } else {
        console.warn('Driving route failed, attempting flight path fallback:', status);
        
        const geocoder = new google.maps.Geocoder();
        
        // geocode origin and destination to draw a flight path
        Promise.all([
          new Promise<google.maps.LatLng>((resolve, reject) => {
            geocoder.geocode({ address: origin }, (results, gStatus) => {
              if (gStatus === 'OK' && results?.[0]) resolve(results[0].geometry.location);
              else reject(`Origin geocode failed: ${gStatus}`);
            });
          }),
          new Promise<google.maps.LatLng>((resolve, reject) => {
            if (destinationCoords) {
              resolve(new google.maps.LatLng(destinationCoords.lat, destinationCoords.lng));
            } else {
              geocoder.geocode({ address: destination }, (results, gStatus) => {
                if (gStatus === 'OK' && results?.[0]) resolve(results[0].geometry.location);
                else reject(`Destination geocode failed: ${gStatus}`);
              });
            }
          })
        ]).then(([originPos, destPos]) => {
          const path = [originPos, destPos];
          
          const flightPath = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#fbbf24',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            map: map,
            icons: [{
              icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
              offset: '50%'
            }]
          });
          
          flightPathRef.current = flightPath;
          
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(originPos);
          bounds.extend(destPos);
          map.fitBounds(bounds);

          onRouteFound({
            distance: 'Inter-continental',
            duration: 'Flight Required',
            isFlight: true
          });
        }).catch(err => {
          console.error('Final Routing Error:', err);
          onError(`Route calculation failed. ${err}. Please ensure your location and destination are valid.`);
        });
      }
    });

    return () => {
      if (rendererRef.current) rendererRef.current.setMap(null);
      if (flightPathRef.current) flightPathRef.current.setMap(null);
    };
  }, [routesLib, geocodingLib, map, origin, destination, destinationCoords]);

  return null;
}

export const TravelGuideView: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [loadingCity, setLoadingCity] = useState(true);
  const [userCountry, setUserCountry] = useState('');
  const [userCity, setUserCity] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string; isFlight: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      if (!cityId) {
        setLoadingCity(false);
        return;
      }

      setLoadingCity(true);
      console.log('Fetching city with ID:', cityId);

      try {
        // 1. Check Mock Data
        const foundMock = MOCK_CITIES.find(c => c.id === cityId);
        if (foundMock) {
          setCity(foundMock);
          setLoadingCity(false);
          return;
        }

        // 2. Try partial match in Mock Data (case insensitive)
        const partialMock = MOCK_CITIES.find(c => 
          c.name.toLowerCase().includes(cityId.toLowerCase()) || 
          cityId.toLowerCase().includes(c.name.toLowerCase())
        );
        if (partialMock) {
          setCity(partialMock);
          setLoadingCity(false);
          return;
        }

        // 3. Try Supabase
        const data = await supabaseService.getCityById(cityId);
        if (data) {
          setCity(data);
          setLoadingCity(false);
          return;
        }
      } catch (err) {
        console.error('City fetch failed:', err);
      }

      // 4. Final Fallback: If still not found, use first city as default
      console.warn('City not found, falling back to default city');
      setCity(MOCK_CITIES[0]);
      setLoadingCity(false);
    };

    fetchCity();
  }, [cityId]);


  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCountry || !userCity) return;
    
    setIsLoading(true);
    setIsCalculated(false);
    setRouteInfo(null);
    setError(null);
    
    setTimeout(() => {
      setIsCalculated(true);
      setIsLoading(false);
    }, 800);
  };

  if (loadingCity) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] italic">Loading Destination Details...</p>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center font-sans">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 border border-white/10 p-12 rounded-sm max-w-md w-full"
        >
          <AlertTriangle className="text-accent mx-auto mb-6" size={48} />
          <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 font-mono">TECHNICAL ERROR</p>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-6 leading-none">CITY NOT FOUND</h2>
          <p className="text-white/40 text-xs mb-8 leading-relaxed font-medium uppercase tracking-widest">
            The city ID <span className="text-white">"{cityId}"</span> could not be resolved in the host registry.
          </p>
          <Link 
            to="/cities" 
            className="inline-block w-full py-4 bg-white text-black font-black uppercase italic text-xs tracking-widest rounded-sm hover:bg-accent transition-all shadow-xl"
          >
            Return to Host Cities
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!hasValidKey) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8 font-sans">
        <div className="max-w-xl w-full bg-white/5 border border-white/10 p-12 rounded-sm text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent/20">
             <ShieldCheck className="text-black" size={32} />
          </div>
          <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-6">Maps Integration Required</h3>
          <p className="text-white/60 mb-8 leading-relaxed">To view interactive travel routes and host city maps, you need to configure your Google Maps Platform credentials.</p>
          
          <div className="space-y-4 text-left">
            <div className="bg-white/5 p-4 border border-white/5 rounded">
              <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 font-mono">STEP 1</p>
              <p className="text-white font-medium">Add Secret Key: <code>VITE_GOOGLE_MAPS_PLATFORM_KEY</code> in Settings.</p>
            </div>
            <div className="bg-white/5 p-4 border border-white/5 rounded">
              <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 font-mono">STEP 2</p>
              <p className="text-white font-medium leading-relaxed">Enable <b>Maps JavaScript API</b>, <b>Routes API</b>, and <b>Geocoding API</b> in your Google Cloud Console.</p>
            </div>
            <div className="bg-white/5 p-4 border border-white/5 rounded">
              <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 font-mono">DEBUG TIP</p>
              <p className="text-white/60 text-xs italic">If you see "ApiTargetBlockedMapError", ensure your Map ID is created for the "Web" platform and associated with your API key.</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-10 px-8 py-3 bg-white text-black font-black uppercase italic text-xs tracking-widest rounded-sm hover:bg-accent transition-all"
          >
            Refresh Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Form and Info */}
          <div className="lg:w-1/3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Link to="/cities" className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-[10px] font-black uppercase tracking-widest">
                <Navigation size={12} className="rotate-[-90deg]" />
                Back to Host Cities
              </Link>
              <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                TRAVEL <span className="text-accent underline decoration-white/10 decoration-8 underline-offset-8">GUIDE</span>
              </h1>
              <div className="p-6 bg-white/5 border border-white/10 rounded-sm group hover:border-accent/40 transition-colors">
                <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-2 italic">Official Destination</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black italic uppercase leading-none mb-1">{city.name}</h2>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{city.stadium}</p>
                  </div>
                  <MapPin className="text-accent" size={32} />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-sm text-black shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Plane size={100} className="rotate-45" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-black" />
                  Plan Your Journey
                </h3>
                <form onSubmit={handleCalculateRoute} className="space-y-6">
                  <div className="space-y-4">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 group-focus-within:text-black transition-colors">Origin Country</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="text" 
                          placeholder="e.g. United Kingdom"
                          value={userCountry}
                          onChange={(e) => setUserCountry(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 pl-12 rounded-md focus:ring-4 focus:ring-accent/20 focus:border-accent outline-none font-bold text-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 group-focus-within:text-black transition-colors">Departure City</label>
                      <div className="relative">
                        <MapIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="text" 
                          placeholder="e.g. London"
                          value={userCity}
                          onChange={(e) => setUserCity(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 pl-12 rounded-md focus:ring-4 focus:ring-accent/20 focus:border-accent outline-none font-bold text-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-5 rounded-md font-black uppercase italic tracking-widest text-xs hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-3 group"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Calculate Optimal Route</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                    Powered by Google Maps Platform for global transit and airspace mapping.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Map and Results */}
          <div className="lg:w-2/3 h-[600px] lg:h-auto min-h-[500px] relative rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={city.location || { lat: 39.8283, lng: -98.5795 }}
                defaultZoom={city.location ? 12 : 4}
                mapId={MAP_ID}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
              >
                {/* Destination Marker - Use AdvancedMarker only if mapId exists */}
                {city.location && MAP_ID ? (
                  <AdvancedMarker position={city.location} title={city.stadium}>
                    <Pin background={'#fbbf24'} borderColor={'#000'} glyphColor={'#000'} scale={1.2} />
                  </AdvancedMarker>
                ) : (
                  city.location && (
                    <Marker position={city.location} title={city.stadium} />
                  )
                )}

                {isCalculated && userCity && userCountry && (
                  <RouteDisplay 
                    origin={`${userCity}, ${userCountry}`} 
                    destination={`${city.stadium}, ${city.name}`} 
                    destinationCoords={city.location}
                    onRouteFound={setRouteInfo}
                    onError={setError}
                  />
                )}
              </Map>
            </APIProvider>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 left-6 right-6 z-40"
                >
                  <div className="bg-red-600 text-white p-4 rounded-lg shadow-2xl flex items-center gap-3 border border-red-500">
                    <AlertTriangle size={20} className="shrink-0" />
                    <p className="text-xs font-black uppercase tracking-tight">{error}</p>
                  </div>
                </motion.div>
              )}
              {!isCalculated && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 z-20 pointer-events-none"
                >
                  <div className="text-center max-w-sm">
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent/20">
                      <Sparkles size={40} className="text-accent animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Route Intelligence</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed uppercase tracking-widest text-[10px]">Enter your origin to visualy map your travel path to {city.stadium} in {city.name}.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {routeInfo && (
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute top-6 right-6 z-30 space-y-3"
              >
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-white flex items-center gap-5 text-black">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 ${routeInfo.isFlight ? 'bg-blue-600' : 'bg-green-600'}`}>
                    {routeInfo.isFlight ? <Plane size={24} /> : <Car size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[10px] font-black uppercase text-slate-400">Optimal Route</p>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded text-white ${routeInfo.isFlight ? 'bg-blue-600' : 'bg-green-600'}`}>
                        {routeInfo.isFlight ? 'FLIGHT' : 'LAND'}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Distance</p>
                        <p className="text-sm font-black italic uppercase">{routeInfo.distance}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-100" />
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Est. Time</p>
                        <p className="text-sm font-black italic uppercase">{routeInfo.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Section: Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <Globe className="text-blue-500" />, title: "Visa Requirements", desc: "Ensure you check host nation entry requirements for CA, MX, and USA." },
            { icon: <ShieldCheck className="text-green-500" />, title: "Safety Protocol", desc: "Dedicated fan zones and secure transit will be provided in all host cities." },
            { icon: <Info className="text-amber-500" />, title: "Match Day Transit", desc: "Expect heavy traffic near the stadium. Public transit is highly recommended." }
          ].map((tip, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="bg-white/5 border border-white/10 p-6 rounded-sm flex items-start gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="p-3 bg-white/5 rounded border border-white/10">{tip.icon}</div>
              <div>
                <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 italic">{tip.title}</h4>
                <p className="text-xs text-white/40 font-medium leading-relaxed">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
