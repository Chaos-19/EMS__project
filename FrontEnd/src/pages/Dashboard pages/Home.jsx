import EventCard from '../../components/EventComponents/EventCard';
import { events } from '../../data/events';
import { useTheme } from '../../contexts/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme.text}`}>Upcoming Events</h2>
        <p className={`mt-2 ${theme.textSecondary}`}>Don't miss out on these exciting company events!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}