import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import useEventDetails from '../../hooks/eventHooks/useEventDetails';
import { motion } from 'framer-motion';

const EventDetails = () => {
  const { theme } = useTheme();
  const { eventId } = useParams();
  const { event, loading, error } = useEventDetails(eventId);

  if (loading) {
    return <div className="text-center mt-20 text-lg font-semibold animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500 font-semibold">{error}</div>;
  }

  if (!event) {
    return <div className="text-center mt-20 text-lg font-semibold">Event not found</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} pt-20 px-4`}> 
      <motion.div 
        className="relative bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-3xl w-full mt-20 mb-10 border border-transparent dark:border-gray-700 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-xl"></div>
        
        <h2 className={`relative text-4xl font-bold text-center mb-6 ${theme.text} tracking-wide`}>{event.title}</h2>
        <motion.img 
          src={event.image} 
          alt={event.title} 
          className="relative w-full h-64 object-cover rounded-lg shadow-md mb-6 border border-transparent hover:border-blue-500 transition"
          whileHover={{ scale: 1.05 }}
        />
        <div className="relative flex flex-col space-y-4 mb-6 p-4 bg-opacity-30 backdrop-blur-lg rounded-lg">
          {[{ icon: CalendarIcon, text: new Date(event.date).toLocaleDateString() },
            { icon: ClockIcon, text: event.StartTime },
            { icon: MapPinIcon, text: event.location },
            { icon: UserIcon, text: event.host },
            { icon: TagIcon, text: event.eventCategory }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <item.icon className={`h-6 w-6 ${theme.text}`} />
              <span className={`text-lg ${theme.text}`}>{item.text}</span>
            </div>
          ))}
        </div>
        <p className={`relative text-lg ${theme.textSecondary} mb-6 leading-relaxed`}>{event.description}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/booking/${eventId}`} 
            className="relative bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 border-2 border-transparent hover:border-blue-300"
          >
            Book Now
          </Link>
          <div className="text-right">
            <p className={`text-sm ${theme.textSecondary}`}>Hosted by:</p>
            <p className={`text-lg font-semibold ${theme.text}`}>{event.host}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;