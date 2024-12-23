import { useTheme } from '../../contexts/ThemeContext';
import EventCard from '../../components/EventComponents/EventCard';

const pastEvents = [
  {
    id: 4,
    title: "Winter Gala 2023",
    description: "Annual celebration of our company achievements and team members.",
    date: "2023-12-15",
    time: "7:00 PM - 11:00 PM",
    location: "Royal Hotel",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  // Add more past events here
];

export default function PastEvents() {
  const { theme } = useTheme();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme.text}`}>Past Events</h2>
        <p className={`mt-2 ${theme.textSecondary}`}>Relive our memorable moments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}