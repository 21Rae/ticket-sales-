import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking } from '../types';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<string>;
  cancelBooking: (id: string) => void;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem('fifa_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('fifa_bookings', JSON.stringify(updatedBookings));
    return newBooking.id;
  };

  const cancelBooking = (id: string) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('fifa_bookings', JSON.stringify(updatedBookings));
  };

  const getBookingById = (id: string) => bookings.find(b => b.id === id);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getBookingById }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
