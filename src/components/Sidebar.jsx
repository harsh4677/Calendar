import React from 'react';
import CreateEventButton from './CreateEventButton'
import SmallCalendar from "./SmallCalendar";
import Labels from './Labels';
import EventList from './EventList';
import ExportEvents from './ExportEvents';

const Sidebar = () => {
    return(
        <aside className='border p-5 w-64'>
            <CreateEventButton/>
            <SmallCalendar/>
            <Labels/>
            <EventList/>
            <ExportEvents/>
        </aside>
    )
  
}

export default Sidebar;