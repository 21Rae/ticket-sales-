import { Event, Ticket, Stadium, City } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Opening Match: Mexico vs. Argentina',
    venue: 'Estadio Azteca',
    location: 'Mexico City, MX',
    date: '2026-06-11',
    time: '5:00 PM',
    startingPrice: 450,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    name: 'USA vs. Jordan',
    venue: 'SoFi Stadium',
    location: 'Los Angeles, CA',
    date: '2026-06-12',
    time: '8:00 PM',
    startingPrice: 320,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    name: 'Canada vs. France',
    venue: 'BMO Field',
    location: 'Toronto, ON',
    date: '2026-06-13',
    time: '6:00 PM',
    startingPrice: 280,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    name: 'England vs. Curaçao',
    venue: 'MetLife Stadium',
    location: 'East Rutherford, NJ',
    date: '2026-06-15',
    time: '7:30 PM',
    startingPrice: 250,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    name: 'Portugal vs. Cape Verde',
    venue: 'Gillette Stadium',
    location: 'Foxborough, MA',
    date: '2026-06-17',
    time: '8:00 PM',
    startingPrice: 220,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '6',
    name: 'Japan vs. Brazil',
    venue: 'BC Place',
    location: 'Vancouver, BC',
    date: '2026-06-18',
    time: '6:00 PM',
    startingPrice: 380,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's2',
    name: 'SoFi Stadium',
    location: 'Los Angeles, CA',
    country: 'USA',
    capacity: '70,000',
    description: 'A revolutionary indoor-outdoor design and the most expensive stadium ever built.',
    image: 'https://images.unsplash.com/photo-1599735073434-6c3e981329be?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's3',
    name: 'Estadio Azteca',
    location: 'Mexico City, MX',
    country: 'Mexico',
    capacity: '87,523',
    description: 'The historic "Cathedral of Football," hosting its third World Cup opening match.',
    image: 'https://images.unsplash.com/photo-1620215904535-43a992525167?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's4',
    name: 'AT&T Stadium',
    location: 'Arlington, TX',
    country: 'USA',
    capacity: '80,000',
    description: 'The largest retractable roof stadium in the world, known for its massive center-hung scoreboard.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's5',
    name: 'BC Place',
    location: 'Vancouver, BC',
    country: 'Canada',
    capacity: '54,500',
    description: "The crown jewel of Canada's west coast sports scene with its retractable roof and harbor views.",
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's6',
    name: 'Hard Rock Stadium',
    location: 'Miami, FL',
    country: 'USA',
    capacity: '64,767',
    description: "A premier global destination for high-intensity sports and entertainment in the heart of Florida.",
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bbe144?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's7',
    name: 'Mercedes-Benz Stadium',
    location: 'Atlanta, GA',
    country: 'USA',
    capacity: '71,000',
    description: 'Architecturally stunning with its "pinwheel" retractable roof and halo video board.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's8',
    name: 'BMO Field',
    location: 'Toronto, ON',
    country: 'Canada',
    capacity: '30,000',
    description: "Canada's national soccer stadium, set for major expansion to host the world's elite.",
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=1200&q=80'
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
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's11',
    name: 'NRG Stadium',
    location: 'Houston, TX',
    country: 'USA',
    capacity: '72,220',
    description: 'The first facility in the NFL with a retractable roof, ideal for high-stakes international play.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's12',
    name: 'Lincoln Financial Field',
    location: 'Philadelphia, PA',
    country: 'USA',
    capacity: '67,594',
    description: 'An energy-efficient stadium known for its passionate fans and clear sightlines.',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80'
  }
];

export const MOCK_CITIES: City[] = [
  {
    id: 'c1',
    name: 'Mexico City',
    country: 'Mexico',
    description: 'A global metropolis with a rich football history, set to host the historic opening match at Estadio Azteca.',
    stadium: 'Estadio Azteca',
    image: 'https://images.unsplash.com/photo-1512813583161-460ca4c6190f?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Opening Match Venue', 'Historic Altitude', 'Football Capital']
  },
  {
    id: 'c2',
    name: 'Los Angeles',
    country: 'USA',
    description: 'The entertainment capital of the world, featuring the cutting-edge SoFi Stadium in Inglewood.',
    stadium: 'SoFi Stadium',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Hollywood Entertainment', 'Coastal Weather', 'Luxury Suites']
  },
  {
    id: 'c3',
    name: 'Toronto',
    country: 'Canada',
    description: "Canada's largest city and cultural hub, bringing a diverse global audience to BMO Field.",
    stadium: 'BMO Field',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Multicultural Hub', 'Lakeshore Scenery', 'Expanded Stadium']
  },
  {
    id: 'c4',
    name: 'New York/New Jersey',
    country: 'USA',
    description: 'The world stage for the Grand Final 2026, where history will be made at MetLife Stadium.',
    stadium: 'MetLife Stadium',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Final Match Venue', 'Skyline Views', 'Global Transit Hub']
  },
  {
    id: 'c5',
    name: 'Vancouver',
    country: 'Canada',
    description: 'Stunning natural beauty meets urban sophistication at the foot of BC Place.',
    stadium: 'BC Place',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Mountain Scenery', 'Retractable Roof', 'West Coast Vibe']
  },
  {
    id: 'c6',
    name: 'Guadalajara',
    country: 'Mexico',
    description: 'The birthplace of tequila and mariachi, offering a vibrant cultural experience at Estadio Akron.',
    stadium: 'Estadio Akron',
    image: 'https://images.unsplash.com/photo-1620215904535-43a992525167?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Cultural Traditions', 'Modern Architecture', 'Passionate Support']
  }
];
