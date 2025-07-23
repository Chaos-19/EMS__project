import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import useEventDetails from "../../hooks/eventHooks/useEventDetails";
import useBookTicket from "../../hooks/eventHooks/useBookTicket";

const BookingPage = () => {
  const { theme } = useTheme();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { event, loading: loadingEvent, error: eventError } = useEventDetails(eventId);
  const { bookTicket, loading: bookingLoading } = useBookTicket(eventId);

  const [bookingCode, setBookingCode] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const textColor = theme.mode === "dark" ? "text-white" : "text-gray-800";
  const inputBg = theme.mode === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300";
  const formBg = theme.mode === "dark" ? "bg-white/10 backdrop-blur-md border border-white/10" : "bg-white/70 backdrop-blur-md border border-gray-200";

  if (loadingEvent) return <div className={`text-center mt-20 ${textColor}`}>Loading...</div>;
  if (eventError) return <div className="text-center mt-20 text-red-500">{eventError}</div>;
  if (!event) return <div className={`text-center mt-20 ${textColor}`}>Event not found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await bookTicket({
      bookingCode: event.eventType === "Private" ? bookingCode : undefined,
      numberOfTickets,
    });

    if (response) {
      navigate(`/events/${eventId}`);
    }
  };

  return (
    <div className={`min-h-screen p-6 flex justify-center items-center ${theme.background}`}>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-xl shadow-2xl transition-all duration-300 ${formBg}`}
      >
        <h2 className={`text-3xl font-extrabold mb-6 text-center ${textColor}`}>🎟 Book Tickets</h2>

        <p className={`mb-6 text-center ${textColor}`}>
          You’re booking for: <strong>{event.title}</strong>
        </p>

        {event.eventType === "Private" && (
          <div className="mb-6">
            <label className={`block mb-2 text-sm font-semibold ${textColor}`} htmlFor="bookingCode">
              Booking Code <span className="text-red-500">*</span>
            </label>
            <input
              id="bookingCode"
              type="text"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              required
              className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
              placeholder="Enter booking code"
            />
          </div>
        )}

        <div className="mb-8">
          <label className={`block mb-2 text-sm font-semibold ${textColor}`} htmlFor="numberOfTickets">
            Number of Tickets
          </label>
          <input
            id="numberOfTickets"
            type="number"
            min={1}
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(parseInt(e.target.value, 10))}
            className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
          />
        </div>

        <button
          type="submit"
          disabled={bookingLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {bookingLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
