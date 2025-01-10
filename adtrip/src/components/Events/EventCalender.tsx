import React, { useEffect, useState, useMemo, useCallback } from "react";
import { fetchEvents } from "../../api/Events"; // Import fetchEvents to get event dates
import { parseEventDate, getDaysInMonth } from "../../utils/dateUtils"; // Utility functions
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icons for navigation

interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEventDates = async () => {
      try {
        const { data, error } = await fetchEvents();
        if (data) {
          setEvents(data);
        } else if (error) {
          setError(error);
        }
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDates();
  }, []);

  // Handle date selection
  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Handle month navigation
  const handleMonthChange = useCallback((direction: "prev" | "next") => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(direction === "prev" ? prevMonth.getMonth() - 1 : prevMonth.getMonth() + 1);
      return newMonth;
    });
  }, []);

  // Memoized function to get events for the selected date
  const eventsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter((event) => {
      const startDate = parseEventDate(event.start_date);
      return (
        selectedDate.getDate() === startDate.getDate() &&
        selectedDate.getMonth() === startDate.getMonth() &&
        selectedDate.getFullYear() === startDate.getFullYear()
      );
    });
  }, [selectedDate, events]);

  // Memoized function to check if a date has an event
  const hasEvent = useCallback(
    (date: Date): boolean => {
      return events.some((event) => {
        const startDate = parseEventDate(event.start_date);
        return (
          date.getDate() === startDate.getDate() &&
          date.getMonth() === startDate.getMonth() &&
          date.getFullYear() === startDate.getFullYear()
        );
      });
    },
    [events]
  );

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Event Calendar</h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => handleMonthChange("prev")}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <h3 className="text-xl font-semibold text-white">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <button
          onClick={() => handleMonthChange("next")}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-white font-bold text-sm">
            {day}
          </div>
        ))}
        {getDaysInMonth(currentMonth).map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`p-3 text-center rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
              date.getMonth() !== currentMonth.getMonth()
                ? "text-gray-400"
                : "text-white"
            } ${
              selectedDate &&
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear()
                ? "bg-blue-500"
                : hasEvent(date)
                ? "bg-orange-500"
                : "bg-slate-700"
            } hover:bg-slate-600`}
          >
            <div className="text-lg font-semibold">{date.getDate()}</div>
            {hasEvent(date) && (
              <div className="text-xs text-white mt-1">Event</div>
            )}
          </div>
        ))}
      </div>

      {/* Display event details for the selected date */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Events on {selectedDate.toLocaleDateString()}
          </h3>
          <ul className="space-y-3">
            {eventsForSelectedDate.map((event) => (
              <li key={event.id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {parseEventDate(event.start_date).toLocaleTimeString()} -{" "}
                  {parseEventDate(event.end_date).toLocaleTimeString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;