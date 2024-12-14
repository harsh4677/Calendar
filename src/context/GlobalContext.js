import React, { createContext, useState, useEffect } from "react";
import { getMonth } from "../util";
import dayjs from "dayjs";

const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [month, setMonth] = useState(getMonth()); 
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [labels, updateLabel] = useState([])
  const [filteredEvents] = useState([])
  const [monthSelected, setMonthSelected] = useState(dayjs()); 

  // Dispatch function for handling actions 
  const dispatchCalEvents = ({ type, payload }) => {
    switch (type) {
      case "push":
        setSavedEvents((prevEvents) => [...prevEvents, payload]); 
        break;
      case "delete":
        setSavedEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== payload.id)
        ); 
        break;
      case "update":
        setSavedEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === payload.id ? { ...event, ...payload } : event
          )
        );
        break;
      case "set":
        setSavedEvents(payload);
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  };

  //Update the month state when monthIndex changes
  useEffect(() => {
    setMonth(getMonth(monthIndex)); 
  }, [monthIndex]);

  return (
    <GlobalContext.Provider 
    value={{ 
      monthIndex, 
      setMonthIndex, 
      month,
      smallCalendarMonth, 
      setSmallCalendarMonth, 
      daySelected, 
      setDaySelected, 
      showEventModal, 
      setShowEventModal, 
      dispatchCalEvents, 
      savedEvents, 
      setSavedEvents, 
      selectedEvent, 
      setSelectedEvent, 
      labels, 
      updateLabel, 
      filteredEvents, 
      monthSelected, 
      setMonthSelected
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
