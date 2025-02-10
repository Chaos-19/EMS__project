import React from 'react';
import useGetAllRequestedEvents from '../../hooks/eventAdminHook/useGetAllRequestedEvents';
import { motion } from 'framer-motion';
import { useTheme } from "../../contexts/ThemeContext";

const RequestedEvent = () => {
  const { theme } = useTheme();
  const { requestedEvents, loading, error } = useGetAllRequestedEvents();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme.background} px-4`}>
      <h1 className={`text-3xl font-bold mb-6 ${theme.text}`}>Requested Events</h1>

      {/* Loading Animation */}
      {loading && (
        <motion.p 
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading...
        </motion.p>
      )}

      {/* Error Message */}
      {error && <p className="text-lg text-red-500">{error}</p>}

      {/* No Events Message */}
      {requestedEvents.length === 0 && !loading && !error && (
        <p className="text-lg text-gray-500 text-center">No requested events found.</p>
      )}

      <div className="w-full max-w-4xl">
        {requestedEvents.map((event) => (
          <motion.div
            key={event._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="text-lg mb-2">{event.description}</p>
            <p className="text-lg mb-2">
              <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "No date provided"}
            </p>
            <p className="text-lg mb-2"><strong>Start Time:</strong> {event.StartTime || "N/A"}</p>
            <p className="text-lg mb-2"><strong>Location:</strong> {event.location || "N/A"}</p>
            <p className="text-lg mb-2"><strong>Event Type:</strong> {event.eventType}</p>
            <p className="text-lg mb-2"><strong>Event Category:</strong> {event.eventCategory || "N/A"}</p>
            <p className="text-lg mb-2"><strong>Host:</strong> {event.host || "N/A"}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RequestedEvent;
