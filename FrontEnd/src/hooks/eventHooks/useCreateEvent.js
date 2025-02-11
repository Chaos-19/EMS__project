import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleInputValidation = ({ title, description, date, StartTime, location, image, eventType, eventCategory, host }) => {
  //   if (!title || !description || !date || !StartTime || !location || !eventType || !eventCategory || !host || !image) {
  //     toast.error('All fields are required');
  //     return false;
  //   }
  //   return true;
  // };
  const handleImageConverter = (image) => {
    if (image) {
      return URL.createObjectURL(image);
    }
  };

  const createEvent = async ({ title, description, date, StartTime, location, image, eventType, eventCategory, host }) => {
    // const success = handleInputValidation({ title, description, date, StartTime, location, image, eventType, eventCategory, host });
    const ImageUri = handleImageConverter(image);
    // if (!success) return;

    setLoading(true);
    setError(null);

    try {
    

      const response = await fetch('/api/event/create', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ title, description, date, StartTime, location, image: ImageUri, eventType, eventCategory, host }), // No need to manually set Content-Type; browser does it
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      toast.success('Event created successfully!');
      navigate(`/events/${data._id}`);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading, error };
};

export default useCreateEvent;
