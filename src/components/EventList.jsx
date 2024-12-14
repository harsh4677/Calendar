import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const EventList = () => {
    const { monthSelected, savedEvents } = useContext(GlobalContext);

    if (!monthSelected) {
        return <p className="text-gray-500 text-sm mt-3">No month selected.</p>;
    }

    // Filtering events to only include those in the selected month
    const eventsForMonth = savedEvents.filter((event) => {
        const eventDate = new Date(event.day);
        return (
            eventDate.getFullYear() === monthSelected.year() &&
            eventDate.getMonth() === monthSelected.month()
        );
    });

    return (
        <div>
            <h2 className="text-lg font-bold mt-5">Events</h2>
            {eventsForMonth.length > 0 ? (
                <ul className="mt-3">
                    {eventsForMonth.map((event) => (
                        <li key={event.id} className={`flex items-center p-2 border-b`}>  
                            <span 
                                className={`w-3 h-3 rounded-full bg-${event.label}-500 mr-2`} 
                            />
                            <div>
                                <p className="text-sm font-medium">{event.title}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(event.day).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-sm mt-3">No events this month.</p>
            )}
        </div>
    );
};

export default EventList;
