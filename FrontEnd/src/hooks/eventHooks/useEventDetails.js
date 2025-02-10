import { useState, useEffect } from 'react';

const useEventDetails = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/event/${eventId}`);
        if (!response.ok) {
          throw new Error('No active event found');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return { event, loading, error };
};

export default useEventDetails;