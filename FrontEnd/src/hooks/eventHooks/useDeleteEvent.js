import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
} from '../../redux/eventStore/eventSlice';

export const useDeleteEvent = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const deleteEvent = async (eventId) => {
    dispatch(deleteEventStart());

    try {
      const res = await fetch(`/api/event/delete-event/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete event');
      }

      dispatch(deleteEventSuccess());
      return true;
    } catch (error) {
      dispatch(deleteEventFailure(error.message));
      return false;
    }
  };

  return { deleteEvent };
};
