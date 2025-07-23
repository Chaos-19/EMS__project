import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createEvent = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/event/create", {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create event");
      }

      toast.success("Event created successfully!");
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
