import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import useTicketBooking from '../../hooks/eventHooks/useTicketBooking';

const Ticket = () => {
  const { theme } = useTheme();
  const { id: eventId } = useParams(); // Get the event ID from the URL
  const { bookTicket, loading, error } = useTicketBooking();
  const [bookingCode, setBookingCode] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    bookTicket({ eventId, bookingCode, numberOfTickets });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} pt-20`}>
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full mt-20 mb-10">
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>Book Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="bookingCode">Booking Code (for private events)</label>
            <input
              type="text"
              id="bookingCode"
              name="bookingCode"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="numberOfTickets">Number of Tickets</label>
            <input
              type="number"
              id="numberOfTickets"
              name="numberOfTickets"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              min="1"
            />
          </div>

          <button
            type="submit"
            className={`${theme.primary} bg-blue-500 text-white font-semibold w-full py-2 rounded-md hover:opacity-90 transition-opacity`}
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Ticket'}
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Ticket;