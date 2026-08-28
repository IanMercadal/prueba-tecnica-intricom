import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { HotelsPage } from './pages/HotelsPage';
import { ClientsPage } from './pages/ClientsPage';
import { BookingsPage } from './pages/BookingsPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/clients">Clients</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/hotels" replace />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
