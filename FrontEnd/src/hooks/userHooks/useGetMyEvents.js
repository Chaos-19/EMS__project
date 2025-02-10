import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const useGetMyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchMyEvents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Ensure authentication
        const res = await fetch(`/api/event/my-events/|${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok) {
          setEvents(data);
        } else {
          setError(data.error);
          toast.error(data.error);
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return {
    events,
    loading,
    error,
  };
};

export default useGetMyEvents;