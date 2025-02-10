import React from 'react';
import useGetMyEvents from '../../hooks/userHooks/useGetMyEvents';
import { motion } from 'framer-motion';
import { useTheme } from "../../contexts/ThemeContext";

const MyEvents = () => {
  const { theme } = useTheme();
  const { events, loading, error } = useGetMyEvents();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme.background}`}>
      <h1 className={`text-3xl font-bold mb-6 ${theme.text}`}>My Events</h1>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
      <div className="w-full max-w-4xl">
        {events.map((event) => (
          <motion.div
            key={event._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="text-lg mb-2">{event.description}</p>
            <p className="text-lg mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><strong>Start Time:</strong> {event.StartTime}</p>
            <p className="text-lg mb-2"><strong>Location:</strong> {event.location}</p>
            <p className="text-lg mb-2"><strong>Event Type:</strong> {event.eventType}</p>
            <p className="text-lg mb-2"><strong>Event Category:</strong> {event.eventCategory}</p>
            <p className="text-lg mb-2"><strong>Host:</strong> {event.host}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;