import { useContext } from "react";
import React from "react";
import GlobalContext from "../context/GlobalContext";

const Labels = () => {
    const {labels, updateLabel} = useContext(GlobalContext)
  return (
    <React.Fragment>
        <p className="text-black text-lg font-bold mt-10 ">
            Label
        </p>
        {labels.map(({label: lbl, checked}, i)=>(
            <label key={i} 
            className="items-center mt-3 block">
                <input 
                type="checkbox" 
                checked={checked}
                onChange={()=> updateLabel({label: lbl, checked: !checked})} 
                className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
                />
                <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
            </label>
        ) )}
    </React.Fragment>
  )
}

export default Labels;