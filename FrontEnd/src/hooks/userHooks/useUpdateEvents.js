// hooks/useUpdateEvent.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEventSuccess, updateEventFailure } from "../redux/eventStore/eventSlice";

export const useUpdateEvent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEvent = async (eventId, updatedData, token) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateEventFailure(data.error || "Update failed"));
        setError(data.error || "Update failed");
      } else {
        dispatch(updateEventSuccess(data.event));
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      dispatch(updateEventFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading, error };
};
