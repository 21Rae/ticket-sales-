import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { BookingProvider } from './lib/BookingContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MatchListView } from './components/MatchListView';
import { TicketSelection } from './components/TicketSelection';
import { UserDashboard } from './components/UserDashboard';
import { LoginPage, SignupPage, VerifyEmailPage } from './components/AuthPages';

import { StadiumsList } from './components/StadiumsList';
import { CitiesList } from './components/CitiesList';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/matches" element={<MatchListView />} />
            <Route path="/stadiums" element={<StadiumsList />} />
            <Route path="/cities" element={<CitiesList />} />
            <Route path="/matches/:id/tickets" element={<TicketSelection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
