import { Event, Ticket, Stadium, City, Team } from './types';

export const MOCK_TEAMS: Team[] = [
  {
    id: 'usa',
    name: 'United States',
    description: 'USA at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=800&q=80',
    group: 'D',
    ranking: 11,
    flagCode: 'us'
  },
  {
    id: 'canada',
    name: 'Canada',
    description: 'Canada at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    group: 'B',
    ranking: 45,
    flagCode: 'ca'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    description: 'Mexico at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 15,
    flagCode: 'mx'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    description: 'Brazil at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&w=800&q=80',
    group: 'C',
    ranking: 5,
    flagCode: 'br'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    description: 'Argentina at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    group: 'J',
    ranking: 1,
    flagCode: 'ar'
  },
  {
    id: 'japan',
    name: 'Japan',
    description: 'Japan at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1551290464-672935272332?auto=format&fit=crop&w=800&q=80',
    group: 'F',
    ranking: 18,
    flagCode: 'jp'
  },
  {
    id: 'iran',
    name: 'IR Iran',
    description: 'IR Iran at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    group: 'G',
    ranking: 20,
    flagCode: 'ir'
  },
  {
    id: 'colombia',
    name: 'Colombia',
    description: 'Colombia at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d445ebb751?auto=format&fit=crop&w=800&q=80',
    group: 'K',
    ranking: 12,
    flagCode: 'co'
  },
  {
    id: 'korea',
    name: 'Korea Republic',
    description: 'Korea Republic at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1550117462-a5ec08bf0ac5?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 22,
    flagCode: 'kr'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Mexico vs. South Africa',
    venue: 'Mexico City Stadium',
    location: 'Mexico City, MX',
    date: '2026-06-11',
    time: '20:00',
    startingPrice: 450,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546750547-759089771198?auto=format&fit=crop&w=1200&q=80', // Azteca
    details: {
      rankings: { home: 15, away: 59 },
      historical: { lastMatch: 'Mexico 1-1 South Africa (2010)', headToHead: 'Mex: 2 wins, SA: 1 win, 1 draw' },
      weatherForecast: '22°C, Sunny'
    }
  },
  {
    id: '2',
    name: 'Korea Republic vs. Czechia',
    venue: 'Guadalajara Stadium',
    location: 'Guadalajara, MX',
    date: '2026-06-12',
    time: '03:00',
    startingPrice: 320,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', // Akron
    details: {
      rankings: { home: 22, away: 36 },
      historical: { lastMatch: 'Czechia 1-2 Korea Republic (2016)', headToHead: 'Korea: 1 win' },
      weatherForecast: '28°C, Clear'
    }
  },
  {
    id: '3',
    name: 'Canada vs. Bosnia and Herzegovina',
    venue: 'Toronto Stadium',
    location: 'Toronto, ON',
    date: '2026-06-12',
    time: '20:00',
    startingPrice: 280,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80', // BMO
    details: {
      rankings: { home: 45, away: 74 },
      historical: { lastMatch: 'First Competitive Meeting', headToHead: 'No previous matches' },
      weatherForecast: '18°C, Partly Cloudy'
    }
  },
  {
    id: '4',
    name: 'USA vs. Paraguay',
    venue: 'Los Angeles Stadium',
    location: 'Los Angeles, CA',
    date: '2026-06-13',
    time: '02:00',
    startingPrice: 350,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1606013610996-03c00327f277?auto=format&fit=crop&w=1200&q=80', // SoFi
    details: {
      rankings: { home: 11, away: 56 },
      historical: { lastMatch: 'USA 1-0 Paraguay (2018)', headToHead: 'USA: 4 wins, Par: 2 wins' },
      weatherForecast: '21°C, Sunny'
    }
  },
  {
    id: '5',
    name: 'Qatar vs. Switzerland',
    venue: 'San Francisco Bay Area Stadium',
    location: 'Santa Clara, CA',
    date: '2026-06-13',
    time: '20:00',
    startingPrice: 210,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80', // Levi's
    details: {
      rankings: { home: 34, away: 19 },
      historical: { lastMatch: 'Switzerland 0-1 Qatar (2018)', headToHead: 'Qatar: 1 win' },
      weatherForecast: '19°C, Breezy'
    }
  },
  {
    id: '6',
    name: 'Brazil vs. Morocco',
    venue: 'New York/New Jersey Stadium',
    location: 'East Rutherford, NJ',
    date: '2026-06-13',
    time: '23:00',
    startingPrice: 420,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1563299796-1709eeda2749?auto=format&fit=crop&w=1200&q=80',
    details: {
      rankings: { home: 5, away: 13 },
      historical: { lastMatch: 'Morocco 2-1 Brazil (2023)', headToHead: 'Brazil: 2 wins, Mor: 1 win' },
      weatherForecast: '22°C, Clear'
    }
  },
  {
    id: '7',
    name: 'Haiti vs. Scotland',
    venue: 'Boston Stadium',
    location: 'Boston, MA',
    date: '2026-06-14',
    time: '02:00',
    startingPrice: 190,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1563299796-1709eeda2749?auto=format&fit=crop&w=1200&q=80', // Gillette
    details: {
      rankings: { home: 90, away: 39 },
      historical: { lastMatch: 'First Meeting', headToHead: 'No previous matches' },
      weatherForecast: '20°C, Clear'
    }
  },
  {
    id: '8',
    name: 'Australia vs. Türkiye',
    venue: 'BC Place Vancouver',
    location: 'Vancouver, BC',
    date: '2026-06-14',
    time: '05:00',
    startingPrice: 260,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80', // BC Place
    details: {
      rankings: { home: 24, away: 40 },
      historical: { lastMatch: 'Australia 1-1 Türkiye (2004)', headToHead: 'Tur: 1 win, 1 draw' },
    }
  },
  {
    id: '9',
    name: 'Germany vs. Curaçao',
    venue: 'Houston Stadium',
    location: 'Houston, TX',
    date: '2026-06-14',
    time: '18:00',
    startingPrice: 380,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', // NRG
    details: {
      rankings: { home: 16, away: 86 },
      historical: { lastMatch: 'Never Played', headToHead: 'First Matchup' },
    }
  },
  {
    id: '10',
    name: 'Netherlands vs. Japan',
    venue: 'Dallas Stadium',
    location: 'Arlington, TX',
    date: '2026-06-14',
    time: '21:00',
    startingPrice: 340,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1540749303346-5b0aa034ef82?auto=format&fit=crop&w=1200&q=80', // AT&T
    details: {
      rankings: { home: 7, away: 18 },
      historical: { lastMatch: 'Netherlands 2-2 Japan (2013)', headToHead: 'Ned: 2 wins, 1 draw' },
      weatherForecast: '30°C, Hot'
    }
  },
  {
    id: '11',
    name: 'Spain vs. Saudi Arabia',
    venue: 'Atlanta Stadium',
    location: 'Atlanta, GA',
    date: '2026-06-15',
    time: '17:00',
    startingPrice: 310,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1541744354670-8126cc135431?auto=format&fit=crop&w=1200&q=80', // Atlanta
    details: {
      rankings: { home: 8, away: 53 },
      historical: { lastMatch: 'Spain 1-0 Saudi Arabia (2012)', headToHead: 'Spain: 3 wins' },
      weatherForecast: '26°C, Humid'
    }
  },
  {
    id: '12',
    name: 'Belgium vs. Egypt',
    venue: 'Seattle Stadium',
    location: 'Seattle, WA',
    date: '2026-06-15',
    time: '20:00',
    startingPrice: 290,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80', // Seattle
    details: {
      rankings: { home: 3, away: 36 },
      historical: { lastMatch: 'Egypt 2-1 Belgium (2022)', headToHead: 'Bel: 2 wins, Egy: 3 wins' },
    }
  },
  {
    id: '13',
    name: 'Saudi Arabia vs. Uruguay',
    venue: 'Miami Stadium',
    location: 'Miami, FL',
    date: '2026-06-15',
    time: '23:00',
    startingPrice: 330,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1628120300661-eb83a45391a2?auto=format&fit=crop&w=1200&q=80', // Miami
    details: {
      rankings: { home: 53, away: 11 },
      historical: { lastMatch: 'Uruguay 1-0 Saudi Arabia (2018)', headToHead: 'Uru: 1 win, 2 draws' },
    }
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 't1',
    section: '101',
    row: 'A',
    price: 350,
    features: ['Field View', 'Quick Exit', 'Seat Service'],
  },
  {
    id: 't2',
    section: '204',
    row: 'F',
    price: 220,
    features: ['Mid-tier', 'Center View'],
  },
  {
    id: 't3',
    section: 'Upper Deck 5',
    row: 'Z',
    price: 85,
    features: ['Budget-friendly'],
  },
];

export const MOCK_STADIUMS: Stadium[] = [
  {
    id: 's1',
    name: 'MetLife Stadium',
    location: 'East Rutherford, NJ',
    country: 'USA',
    capacity: '82,500',
    description: 'The standard-bearer for large-scale multi-purpose stadiums, set to host the Grand Final.',
    image: 'https://images.unsplash.com/photo-1563299796-1709eeda2749?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's2',
    name: 'SoFi Stadium',
    location: 'Los Angeles, CA',
    country: 'USA',
    capacity: '70,000',
    description: 'A revolutionary indoor-outdoor design and the most expensive stadium ever built.',
    image: 'https://images.unsplash.com/photo-1606013610996-03c00327f277?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's3',
    name: 'Estadio Azteca',
    location: 'Mexico City, MX',
    country: 'Mexico',
    capacity: '87,523',
    description: 'The historic "Cathedral of Football," hosting its third World Cup opening match.',
    image: 'https://images.unsplash.com/photo-1546750547-759089771198?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's4',
    name: 'AT&T Stadium',
    location: 'Arlington, TX',
    country: 'USA',
    capacity: '80,000',
    description: 'The largest retractable roof stadium in the world, known for its massive center-hung scoreboard.',
    image: 'https://images.unsplash.com/photo-1540749303346-5b0aa034ef82?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's5',
    name: 'BC Place',
    location: 'Vancouver, BC',
    country: 'Canada',
    capacity: '54,500',
    description: "The crown jewel of Canada's west coast sports scene with its retractable roof and harbor views.",
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's6',
    name: 'Hard Rock Stadium',
    location: 'Miami, FL',
    country: 'USA',
    capacity: '64,767',
    description: "A premier global destination for high-intensity sports and entertainment in the heart of Florida.",
    image: 'https://images.unsplash.com/photo-1628120300661-eb83a45391a2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's7',
    name: 'Mercedes-Benz Stadium',
    location: 'Atlanta, GA',
    country: 'USA',
    capacity: '71,000',
    description: 'Architecturally stunning with its "pinwheel" retractable roof and halo video board.',
    image: 'https://images.unsplash.com/photo-1541744354670-8126cc135431?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's8',
    name: 'BMO Field',
    location: 'Toronto, ON',
    country: 'Canada',
    capacity: '30,000',
    description: "Canada's national soccer stadium, set for major expansion to host the world's elite.",
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's9',
    name: 'Lumen Field',
    location: 'Seattle, WA',
    country: 'USA',
    capacity: '69,000',
    description: "Famous for its deafening atmosphere and unique 'V' shape, offering panoramic skyline views.",
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's10',
    name: 'Levi\'s Stadium',
    location: 'Santa Clara, CA',
    country: 'USA',
    capacity: '68,500',
    description: 'A high-tech, eco-friendly masterpiece in the heart of Silicon Valley.',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's11',
    name: 'NRG Stadium',
    location: 'Houston, TX',
    country: 'USA',
    capacity: '72,220',
    description: 'The first facility in the NFL with a retractable roof, ideal for high-stakes international play.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's12',
    name: 'Lincoln Financial Field',
    location: 'Philadelphia, PA',
    country: 'USA',
    capacity: '67,594',
    description: 'An energy-efficient stadium known for its passionate fans and clear sightlines.',
    image: 'https://images.unsplash.com/photo-1540749303346-5b0aa034ef82?auto=format&fit=crop&w=1200&q=80'
  }
];

export const MOCK_CITIES: City[] = [
  {
    id: 'c1',
    name: 'Mexico City',
    country: 'Mexico',
    description: 'A global metropolis with a rich football history, set to host the historic opening match at Estadio Azteca.',
    stadium: 'Estadio Azteca',
    image: 'https://images.unsplash.com/photo-1546750547-759089771198?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Opening Match Venue', 'Historic Altitude', 'Football Capital']
  },
  {
    id: 'c2',
    name: 'Los Angeles',
    country: 'USA',
    description: 'The entertainment capital of the world, featuring the cutting-edge SoFi Stadium in Inglewood.',
    stadium: 'SoFi Stadium',
    image: 'https://images.unsplash.com/photo-1606013610996-03c00327f277?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Hollywood Entertainment', 'Coastal Weather', 'Luxury Suites']
  },
  {
    id: 'c3',
    name: 'Toronto',
    country: 'Canada',
    description: "Canada's largest city and cultural hub, bringing a diverse global audience to BMO Field.",
    stadium: 'BMO Field',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Multicultural Hub', 'Lakeshore Scenery', 'Expanded Stadium']
  },
  {
    id: 'c4',
    name: 'New York/New Jersey',
    country: 'USA',
    description: 'The world stage for the Grand Final 2026, where history will be made at MetLife Stadium.',
    stadium: 'MetLife Stadium',
    image: 'https://images.unsplash.com/photo-1563299796-1709eeda2749?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Final Match Venue', 'Skyline Views', 'Global Transit Hub']
  },
  {
    id: 'c5',
    name: 'Vancouver',
    country: 'Canada',
    description: 'Stunning natural beauty meets urban sophistication at the foot of BC Place.',
    stadium: 'BC Place',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Mountain Scenery', 'Retractable Roof', 'West Coast Vibe']
  },
  {
    id: 'c6',
    name: 'Guadalajara',
    country: 'Mexico',
    description: 'The birthplace of tequila and mariachi, offering a vibrant cultural experience at Estadio Akron.',
    stadium: 'Estadio Akron',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Cultural Traditions', 'Modern Architecture', 'Passionate Support']
  }
];
