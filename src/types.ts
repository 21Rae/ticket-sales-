export interface Event {
  id: string;
  name: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  startingPrice: number;
  category: 'Concerts' | 'Sports' | 'Theater' | 'Comedy';
  image: string;
}

export interface Ticket {
  id: string;
  section: string;
  row: string;
  price: number;
  features: string[];
}

export interface PriceBreakdown {
  basePrice: number;
  serviceFee: number;
  tax: number;
  total: number;
}

export interface Stadium {
  id: string;
  name: string;
  location: string;
  country: string;
  capacity: string;
  description: string;
  image: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  stadium: string;
  image: string;
  highlights: string[];
}
