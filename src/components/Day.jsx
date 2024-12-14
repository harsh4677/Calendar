import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const { 
    setDaySelected, 
    setShowEventModal, 
    savedEvents: filteredEvents, 
    setSelectedEvent, 
    dispatchCalEvents
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(event => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events);
  }, [filteredEvents, day]);

  // Handle the start of a drag operation
  const handleDragStart = (event, draggedEvent) => {
    event.dataTransfer.setData("eventId", draggedEvent.id);
  };

  // Handle dropping a dragged event onto a new day
  const handleDrop = (event) => {
    event.preventDefault();
    const eventId = event.dataTransfer.getData("eventId");
    const updatedEvents = filteredEvents.map(ev =>
      ev.id === parseInt(eventId) ? { ...ev, day: day.valueOf() } : ev
    );
    dispatchCalEvents({ type: "set", payload: updatedEvents });
  };

  // Allow the day container to accept dragged items
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Determine if the current day is today
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-8 h-8' : '';
  }

  //Check if the day falls on a weekend
  function isWeekend() {
    const weekday = day.day(); 
    return weekday === 0 || weekday === 6; 
  }

  return (
    <div className={`border border-gray-300 flex flex-col ${isWeekend() ? 'bg-gray-200' : 'bg-white'}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-lg font-bold mt-1 text-black">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`text-lg p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((event, i) => (
          <div key={i}
            draggable
            onDragStart={(e)=> handleDragStart(e, event)}
            onClick={() => setSelectedEvent(event)}
            className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
