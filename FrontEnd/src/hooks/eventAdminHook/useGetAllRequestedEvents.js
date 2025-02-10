import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const useGetAllRequestedEvents = () => {
  const [requestedEvents, setRequestedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchRequestedEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/event/requested-event', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error('Invalid server response.');
        }

        console.log("Fetched Events:", data); // ✅ Debugging line

        if (res.ok) {
          setRequestedEvents(data);
        } else {
          throw new Error(data.error || 'Failed to fetch events.');
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.role === 'Admin') {
      fetchRequestedEvents();
    } else {
      setError('Access Denied. Only Admins can view all requested events!');
      toast.error('Access Denied. Only Admins can view all requested events!');
    }
  }, [currentUser]);

  return {
    requestedEvents,
    loading,
    error,
  };
};

export default useGetAllRequestedEvents;