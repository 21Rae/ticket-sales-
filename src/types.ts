export interface EventDetail {
  rankings: {
    home: number;
    away: number;
  };
  historical: {
    lastMatch: string;
    headToHead: string;
  };
  weatherForecast?: string;
}

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
  details?: EventDetail;
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

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    marketing: boolean;
    notifications: boolean;
  };
}

export interface TicketCategory {
  id: 'vip' | 'premium' | 'standard';
  name: string;
  description: string;
  basePrice: number;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  tickets: {
    categoryId: string;
    quantity: number;
    seats: string[];
    price: number;
  };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  paymentMethod?: {
    last4: string;
    brand: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  image: string;
  group: string;
  ranking: number;
  flagCode: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}
