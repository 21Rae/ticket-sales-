import { Event, Ticket, Stadium, City, Team, TicketCategory, Testimonial, BlogPost } from './types';

export const MOCK_TEAMS: Team[] = [
  {
    id: 'usa',
    name: 'United States',
    description: 'The Stars and Stripes return as hosts, looking to leverage home field advantage in their quest for global glory.',
    image: 'https://www.thesportsbank.net/wp-content/uploads/2022/09/USMNT-1-300x169.png',
    group: 'D',
    ranking: 11,
    flagCode: 'us'
  },
  {
    id: 'canada',
    name: 'Canada',
    description: 'After a historic qualifying run, the Maple Leafs are ready to showcase their rising talent on the big stage.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    group: 'B',
    ranking: 45,
    flagCode: 'ca'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    description: 'With some of the most passionate fans on earth, El Tri aims to dominate in their legendary home stadiums.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 15,
    flagCode: 'mx'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    description: 'The five-time champions bring Samba football to North America, chasing an unprecedented sixth star.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&w=800&q=80',
    group: 'C',
    ranking: 5,
    flagCode: 'br'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    description: 'The defending champions lead by example, proving why they are the standard of excellence in world football.',
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
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    description: 'South Africa at the FIFA World Cup: Team profile and history',
    image: 'https://images.unsplash.com/photo-1576483429314-ec207ca9000a?auto=format&fit=crop&w=800&q=80',
    group: 'D',
    ranking: 59,
    flagCode: 'za'
  },
  {
    id: 'poland',
    name: 'Poland',
    description: 'Poland national team profile',
    image: 'https://images.unsplash.com/photo-1511267644861-c156930949ed?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 26,
    flagCode: 'pl'
  },
  {
    id: 'serbia',
    name: 'Serbia',
    description: 'Serbia national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'C',
    ranking: 29,
    flagCode: 'rs'
  },
  {
    id: 'france',
    name: 'France',
    description: 'France national team profile',
    image: 'https://images.unsplash.com/photo-1540749303346-5b0aa034ef82?auto=format&fit=crop&w=800&q=80',
    group: 'B',
    ranking: 2,
    flagCode: 'fr'
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'Australia national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'B',
    ranking: 25,
    flagCode: 'au'
  },
  {
    id: 'england',
    name: 'England',
    description: 'England national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'B',
    ranking: 4,
    flagCode: 'gb-eng'
  },
  {
    id: 'spain',
    name: 'Spain',
    description: 'Spain national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'E',
    ranking: 10,
    flagCode: 'es'
  },
  {
    id: 'germany',
    name: 'Germany',
    description: 'Germany national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'E',
    ranking: 14,
    flagCode: 'de'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    description: 'Portugal national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'H',
    ranking: 9,
    flagCode: 'pt'
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    description: 'Uruguay national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'H',
    ranking: 16,
    flagCode: 'uy'
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    description: 'Ecuador national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 44,
    flagCode: 'ec'
  },
  {
    id: 'senegal',
    name: 'Senegal',
    description: 'Senegal national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 18,
    flagCode: 'sn'
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    description: 'Costa Rica national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'E',
    ranking: 49,
    flagCode: 'cr'
  },
  {
    id: 'ghana',
    name: 'Ghana',
    description: 'Ghana national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'H',
    ranking: 60,
    flagCode: 'gh'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    description: 'Switzerland national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'G',
    ranking: 12,
    flagCode: 'ch'
  },
  {
    id: 'qatar',
    name: 'Qatar',
    description: 'Qatar national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'A',
    ranking: 58,
    flagCode: 'qa'
  },
  {
    id: 'tunisia',
    name: 'Tunisia',
    description: 'Tunisia national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'D',
    ranking: 30,
    flagCode: 'tn'
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    description: 'Saudi Arabia national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'C',
    ranking: 51,
    flagCode: 'sa'
  },
  {
    id: 'belgium',
    name: 'Belgium',
    description: 'Belgium national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'F',
    ranking: 4,
    flagCode: 'be'
  },
  {
    id: 'morocco',
    name: 'Morocco',
    description: 'Morocco national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'F',
    ranking: 13,
    flagCode: 'ma'
  },
  {
    id: 'croatia',
    name: 'Croatia',
    description: 'Croatia national team profile',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    group: 'F',
    ranking: 7,
    flagCode: 'hr'
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
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1540749176464-1af4d2661395?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1533965935398-76fa48cc1f37?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1550117462-a5ec08bf0ac5?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1529900664624-215109ec9ad4?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's2',
    name: 'SoFi Stadium',
    location: 'Los Angeles, CA',
    country: 'USA',
    capacity: '70,000',
    description: 'A revolutionary indoor-outdoor design and the most expensive stadium ever built.',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's3',
    name: 'Estadio Azteca',
    location: 'Mexico City, MX',
    country: 'Mexico',
    capacity: '87,523',
    description: 'The historic "Cathedral of Football," hosting its third World Cup opening match.',
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's4',
    name: 'AT&T Stadium',
    location: 'Arlington, TX',
    country: 'USA',
    capacity: '80,000',
    description: 'The largest retractable roof stadium in the world, known for its massive center-hung scoreboard.',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's5',
    name: 'BC Place',
    location: 'Vancouver, BC',
    country: 'Canada',
    capacity: '54,500',
    description: "The crown jewel of Canada's west coast sports scene with its retractable roof and harbor views.",
    image: 'https://images.unsplash.com/photo-1540749176464-1af4d2661395?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's6',
    name: 'Hard Rock Stadium',
    location: 'Miami, FL',
    country: 'USA',
    capacity: '64,767',
    description: "A premier global destination for high-intensity sports and entertainment in the heart of Florida.",
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's7',
    name: 'Mercedes-Benz Stadium',
    location: 'Atlanta, GA',
    country: 'USA',
    capacity: '71,000',
    description: 'Architecturally stunning with its "pinwheel" retractable roof and halo video board.',
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's8',
    name: 'BMO Field',
    location: 'Toronto, ON',
    country: 'Canada',
    capacity: '30,000',
    description: "Canada's national soccer stadium, set for major expansion to host the world's elite.",
    image: 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's9',
    name: 'Lumen Field',
    location: 'Seattle, WA',
    country: 'USA',
    capacity: '69,000',
    description: "Famous for its deafening atmosphere and unique 'V' shape, offering panoramic skyline views.",
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's10',
    name: 'Levi\'s Stadium',
    location: 'Santa Clara, CA',
    country: 'USA',
    capacity: '68,500',
    description: 'A high-tech, eco-friendly masterpiece in the heart of Silicon Valley.',
    image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's11',
    name: 'NRG Stadium',
    location: 'Houston, TX',
    country: 'USA',
    capacity: '72,220',
    description: 'The first facility in the NFL with a retractable roof, ideal for high-stakes international play.',
    image: 'https://images.unsplash.com/photo-1521533845262-3864320c4134?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's12',
    name: 'Lincoln Financial Field',
    location: 'Philadelphia, PA',
    country: 'USA',
    capacity: '67,594',
    description: 'An energy-efficient stadium known for its passionate fans and clear sightlines.',
    image: 'https://images.unsplash.com/photo-1566579090262-ec1094148044?auto=format&fit=crop&w=1200&q=80'
  }
];

export const TICKET_CATEGORIES: TicketCategory[] = [
  {
    id: 'vip',
    name: 'VIP Hospitality',
    description: 'Premium lounge access, gourmet dining, and best field views.',
    basePrice: 1200
  },
  {
    id: 'premium',
    name: 'Premium Select',
    description: 'Lower bowl seating with excellent sightlines and priority entry.',
    basePrice: 650
  },
  {
    id: 'standard',
    name: 'Standard Admission',
    description: 'Great atmosphere with clear views of the action.',
    basePrice: 280
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Football Fan',
    text: 'The best booking experience I’ve had. Secure and very easy to use!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5
  },
  {
    id: '2',
    name: 'Marco Rossi',
    role: 'Season Ticket Holder',
    text: 'Got my tickets for the final in minutes. The seat map is super helpful.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5
  },
  {
    id: '3',
    name: 'Elena Silva',
    role: 'Travel Enthusiast',
    text: 'Highly recommended for international fans. Transparent pricing and great support.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 4
  }
];

export const MOCK_CITIES: City[] = [
  {
    id: 'c1',
    name: 'Mexico City',
    country: 'Mexico',
    description: 'A global metropolis with a rich football history, set to host the historic opening match at Estadio Azteca.',
    stadium: 'Estadio Azteca',
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Opening Match Venue', 'Historic Altitude', 'Football Capital']
  },
  {
    id: 'c2',
    name: 'Los Angeles',
    country: 'USA',
    description: 'The entertainment capital of the world, featuring the cutting-edge SoFi Stadium in Inglewood.',
    stadium: 'SoFi Stadium',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Hollywood Entertainment', 'Coastal Weather', 'Luxury Suites']
  },
  {
    id: 'c3',
    name: 'Toronto',
    country: 'Canada',
    description: "Canada's largest city and cultural hub, bringing a diverse global audience to BMO Field.",
    stadium: 'BMO Field',
    image: 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Multicultural Hub', 'Lakeshore Scenery', 'Expanded Stadium']
  },
  {
    id: 'c4',
    name: 'New York/New Jersey',
    country: 'USA',
    description: 'The world stage for the Grand Final 2026, where history will be made at MetLife Stadium.',
    stadium: 'MetLife Stadium',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Final Match Venue', 'Skyline Views', 'Global Transit Hub']
  }
];

export const FAQ_ITEMS = [
  {
    question: 'When do tickets go on sale?',
    answer: 'Phase 1 tickets are currently available for purchase for all group stage matches.'
  },
  {
    question: 'How do I receive my tickets?',
    answer: 'Once confirmed, your e-tickets will be available for download in your dashboard and sent via email.'
  },
  {
    question: 'What is the refund policy?',
    answer: 'Tickets are non-refundable but can be resold through our official fan-to-fan marketplace.'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Road to 2026: North America Prepares',
    excerpt: 'Detailed insights into how the three host nations are transforming their urban infrastructure and stadiums for the 48-team expansion.',
    content: `The 2026 FIFA World Cup is set to be a milestone in sporting history. For the first time, 48 teams will compete across 16 host cities in Canada, Mexico, and the United States. 

From the historic heights of Estadio Azteca in Mexico City to the cutting-edge technology of SoFi Stadium in Los Angeles, the scale of preparation is unprecedented. Infrastructure projects are underway in every host city, including expanded public transit, airport upgrades, and stadium renovations to handle the massive influx of international fans.

This tournament marks a shift in global sports logistics, focusing on sustainability and the legacy of these world-class venues long after the final whistle.`,
    author: 'Admin',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    category: 'Tournament News',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Stadium Spotlight: MetLife Stadium',
    excerpt: 'An in-depth look at the East Rutherford venue selected for the 2026 Grand Final, detailing its capacity and technical upgrades.',
    content: `MetLife Stadium has been officially announced as the prestigious venue for the FIFA World Cup 2026 Grand Final. Located in the New York/New Jersey metropolitan area, this stadium will become the center of the sporting world on July 19, 2026.

The stadium features a massive capacity of over 82,000, ensuring a thunderous atmosphere for the tournament's climax. Technical modifications are currently in progress to bring the field up to FIFA's elite international standards, including the installation of a specialized natural grass surface and high-definition sightlines for the global broadcast audience.

Transportation logistics are also being overhauled, with enhanced rail links from Manhattan and major New Jersey hubs being prioritized to ensure a smooth experience for the thousands of arriving fans.`,
    author: 'Sports Desk',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80',
    category: 'Stadiums',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Fan Guide: Traveling between Host Cities',
    excerpt: 'Everything you need to know about navigating the vast distances across Canada, Mexico, and the USA.',
    content: `Crossing borders and time zones: the 2026 tournament presents a unique logistical challenge for visiting fans. Whether you're following your team from Toronto to Miami or Mexico City to Seattle, planning is key.

Airlines are already preparing for increased demand, and special "Fan Flights" are expected to be announced closer to the event. For those looking for a scenic route, Amtrak and VIA Rail offer cross-country journeys, though these require significantly more time.

Visa requirements are also a critical consideration. With three different countries' laws in play, fans are encouraged to check the official 'FIFA Fan Passport' guidelines for streamlined border crossings during the tournament window.`,
    author: 'Travel News',
    date: '2024-05-01',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80',
    category: 'Fans & Travel',
    readTime: '6 min read'
  }
];
