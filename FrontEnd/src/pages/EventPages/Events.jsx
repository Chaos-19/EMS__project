import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { CalendarIcon, ClockIcon, MapPinIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Events = () => {
  const { theme } = useTheme();
  const [events, setEvents] = useState([]);

  // Dummy event data
  const dummyEvents = [
    {
      id: '1',
      title: "Concert Night",
      description: "Join us for an unforgettable night of music and fun.",
      date: "2023-12-25",
      StartTime: "18:00",
      location: "123 Music Avenue, Concert City",
      image: "https://via.placeholder.com/600x400",
      eventType: "Public",
      eventCategory: "Concert",
      eventStatus: "Active",
      host: "Music Fest",
      createdBy: "User1",
    },
    {
      id: '2',
      title: "Wedding Celebration",
      description: "Celebrate the union of two hearts in a beautiful ceremony.",
      date: "2023-11-15",
      StartTime: "14:00",
      location: "456 Wedding Lane, Love Town",
      image: "https://via.placeholder.com/600x400",
      eventType: "Private",
      eventCategory: "Wedding",
      eventStatus: "Pending",
      host: "Wedding Planners",
      createdBy: "User2",
    },
    {
      id: '3',
      title: "Tech Conference",
      description: "Explore the latest in technology and innovation.",
      date: "2023-10-10",
      StartTime: "09:00",
      location: "789 Tech Street, Innovation City",
      image: "https://via.placeholder.com/600x400",
      eventType: "Public",
      eventCategory: "Conference",
      eventStatus: "Active",
      host: "Tech Innovators",
      createdBy: "User3",
    },
    {
      id: '4',
      title: "Birthday Bash",
      description: "Celebrate with friends and family at the ultimate birthday party.",
      date: "2023-09-05",
      StartTime: "19:00",
      location: "321 Party Road, Celebration City",
      image: "https://via.placeholder.com/600x400",
      eventType: "Private",
      eventCategory: "Party",
      eventStatus: "Cancelled",
      host: "Party Planners",
      createdBy: "User4",
    },
  ];

  useEffect(() => {
    // Fetch event data from dummy data
    const fetchEvents = () => {
      setEvents(dummyEvents);
    };

    fetchEvents();
  }, []);

  // Function to get status icon and color
  const getStatusDetails = (status) => {
    switch (status) {
      case 'Active':
        return {
          icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
          color: 'text-green-500',
        };
      case 'Pending':
        return {
          icon: <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />,
          color: 'text-yellow-500',
        };
      case 'Cancelled':
        return {
          icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
          color: 'text-red-500',
        };
      default:
        return {
          icon: null,
          color: 'text-gray-500',
        };
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className={`text-4xl font-bold text-center mb-12 ${theme.text}`}>All Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const { icon, color } = getStatusDetails(event.eventStatus);

            return (
              <motion.div
                key={event.id}
                className="group relative bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.03, rotate: 0.5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 z-10"></div>

                {/* Event Image */}
                <motion.div
                  className="w-full h-48 object-cover rounded-md mb-6 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Event Content */}
                <div className="relative z-20">
                  {/* Event Title and Status */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-2xl font-bold ${theme.text}`}>{event.title}</h3>
                    <div className={`flex items-center space-x-2 ${color}`}>
                      {icon}
                      <span className="text-sm">{event.eventStatus}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-600" />
                      <span className={`text-sm ${theme.text}`}>
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5 text-gray-600" />
                      <span className={`text-sm ${theme.text}`}>{event.StartTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5 text-gray-600" />
                      <span className={`text-sm ${theme.text}`}>{event.location}</span>
                    </div>
                  </div>

                  {/* Event Description */}
                  <p className={`text-sm ${theme.textSecondary} mb-6 line-clamp-3`}>
                    {event.description}
                  </p>

                  {/* View Details Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={`/events/${event.id}`}
                      className="inline-block w-full text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;