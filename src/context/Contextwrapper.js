import React, { useState, useEffect, useReducer, useMemo } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';
import { getMonth } from '../util';

// Reducer to manage the events
const savedEventsReducer = (state, action) => {
  console.log("Reducer received action:", action);
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "delete":
      return state.filter((event) => event.id !== action.payload.id);
    case "set":
      return action.payload;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

//Initializes events from localStorage
function initEvents(){
  const storageEvents = localStorage.getItem('savedEvents')
  const parseEvents = storageEvents ? JSON.parse(storageEvents) : []
  return parseEvents
}

const Contextwrapper = ({children}) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [month, setMonth] = useState(getMonth()); 
    const [daySelected, setDaySelected] = useState(dayjs);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([])
    const [savedEvents, dispatchCalEvents]= useReducer(savedEventsReducer, [], initEvents )
    const [monthSelected, setMonthSelected] = useState(dayjs());


    //Memoized filtered events 
    const filteredEvents = useMemo(()=>{
      return savedEvents.filter(events => labels.filter((lbl)=> lbl.checked).map(lbl => lbl.label).includes(events.label))
    } , [savedEvents, labels])

    // Store the saved events in localStorage
    useEffect(()=>{
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents])

    //Update the labels based on saved events
    useEffect(()=>{
      setLabels((prevLabels)=> {
        return [...new Set(savedEvents.map(events =>events.label))].map(label => {
          const currentLabel = prevLabels.find(lbl => lbl.label === label)
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          }
        })
      } )
    }, [savedEvents])

    // Update the month data when month index change
    useEffect(() => {
      setMonth(getMonth(monthIndex));
    }, [monthIndex]);

    //Sync the small calendar
    useEffect(()=>{
      if(smallCalendarMonth !== null){
        setMonthIndex(smallCalendarMonth)
      }
    },[smallCalendarMonth])

    //Update the label's checked state
    function updateLabel(label){
      setLabels(labels.map((lbl)=> lbl.label === label.label ? label: lbl))
    }

  // Reset selected event when the event modal is closed
    useEffect(()=>{
      if(!showEventModal){
        setSelectedEvent(null)
      }
    },[showEventModal])

  

  return(
    <GlobalContext.Provider 
    value={{
      monthIndex,
      setMonthIndex, 
      month, 
      setSmallCalendarMonth, 
      smallCalendarMonth, 
      daySelected, 
      setDaySelected, 
      showEventModal, 
      setShowEventModal, 
      dispatchCalEvents, 
      savedEvents,
      selectedEvent,
      setSelectedEvent,
      setLabels,
      labels,
      updateLabel,
      filteredEvents,
      monthSelected,
      setMonthSelected
      }}
      >
        {children}
    </GlobalContext.Provider>
  )
}

export default Contextwrapper;
