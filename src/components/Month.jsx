import React, { useContext } from "react";
import Day from "./Day";
import GlobalContext from "../context/GlobalContext";

const Month = () => {
  const { month } = useContext(GlobalContext); 

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, rowIdx) => (
        <React.Fragment key={rowIdx}>
          {row.map((day, dayIdx) => (
            <Day day={day} rowIdx={rowIdx} key={dayIdx} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
