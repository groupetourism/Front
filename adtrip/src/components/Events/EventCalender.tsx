import React, { useEffect, useState, useMemo, useCallback } from "react";
import { fetchEvents } from "../../api/Events"; // Import fetchEvents to get event dates

interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Store all events
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Selected date state
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Track current month
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch events from the API
  useEffect(() => {
    const fetchEventDates = async () => {
      const { data, error } = await fetchEvents();
      if (data) {
        setEvents(data); // Store all events
      } else if (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchEventDates();
  }, []);

  // Memoized function to parse and format event dates
  const parseEventDate = useCallback((dateString: string): Date => {
    return new Date(dateString);
  }, []);

  // Get the days in the current month
  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add padding for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(new Date(year, month, 0 - i));
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add padding for days after the last day of the month
    const paddingDays = 7 - (days.length % 7);
    for (let i = 1; i <= paddingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle month navigation
  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(
      direction === "prev" ? currentMonth.getMonth() - 1 : currentMonth.getMonth() + 1
    );
    setCurrentMonth(newMonth);
  };

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
  }, [selectedDate, events, parseEventDate]);

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
    [events, parseEventDate]
  );

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-slate-600 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Event Calendar</h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange("prev")}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          Previous
        </button>
        <h3 className="text-lg font-semibold text-white">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <button
          onClick={() => handleMonthChange("next")}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-white font-bold">
            {day}
          </div>
        ))}
        {getDaysInMonth(currentMonth).map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`p-2 text-center rounded-lg cursor-pointer ${
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
            }`}
          >
            {date.getDate()}
            {hasEvent(date) && (
              <div className="text-xs text-white mt-1">Event</div>
            )}
          </div>
        ))}
      </div>

      {/* Display event details for the selected date */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Events on {selectedDate.toLocaleDateString()}
          </h3>
          <ul className="space-y-2">
            {eventsForSelectedDate.map((event) => (
              <li key={event.id} className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="text-lg font-bold text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500">
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