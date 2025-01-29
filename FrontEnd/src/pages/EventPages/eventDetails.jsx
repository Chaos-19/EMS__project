import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const EventDetails = () => {
  const { theme } = useTheme();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

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
    const fetchEvent = () => {
      const event = dummyEvents.find((event) => event.id === eventId);
      setEvent(event);
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} pt-20`}>
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-3xl w-full mt-20 mb-10">
        <h2 className={`text-4xl font-bold text-center mb-6 ${theme.text}`}>{event.title}</h2>
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-6" />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-gray-500" />
            <span className={`text-lg ${theme.text}`}>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-6 w-6 text-gray-500" />
            <span className={`text-lg ${theme.text}`}>{event.StartTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-6 w-6 text-gray-500" />
            <span className={`text-lg ${theme.text}`}>{event.location}</span>
          </div>
        </div>
        <p className={`text-lg ${theme.textSecondary} mb-6`}>{event.description}</p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventDetails;