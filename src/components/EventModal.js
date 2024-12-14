import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import clsx from 'clsx'; 

//Labels for the event
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const { 
    setShowEventModal, 
    daySelected, 
    dispatchCalEvents, 
    selectedEvent, 
    showEventModal 
  } = useContext(GlobalContext);

  // State variables for title, description, and label of the event
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labelsClasses.find((label) => label === selectedEvent.label) : labelsClasses[0]
  );

  if (!showEventModal) return null;

  //Create a new event or update an existing one
  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    //Action to update or create an event
    if (selectedEvent) {
      dispatchCalEvents({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvents({ type: 'push', payload: calendarEvent });
    }

    //Closing the modal after saving
    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <form className="bg-white rounded-lg shadow-2xl w-11/12 md:w-1/3">
        <header className="bg-gray-500 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvents({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => { setShowEventModal(false) }}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="material-icons-outlined text-gray-400">
                schedule
              </span>
            </div>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <div>
              <span className="material-icons-outlined text-gray-400">
                segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add description"
                value={description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-x-2">
              {labelsClasses.map((labelsClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(labelsClass)}
                  className={clsx(
                    `bg-${labelsClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`,
                    { 'border-2 border-white': selectedLabel === labelsClass }
                  )}
                >
                  {selectedLabel === labelsClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
