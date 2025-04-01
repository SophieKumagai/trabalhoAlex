import style from "./Select.module.css";
import React from "react";

function Select({ options, selectedOption, setSelectedOption }) {
  return (
    <select 
      value={selectedOption} 
      onChange={(e) => setSelectedOption(e.target.value)} 
      className={style.option} 
      id={selectedOption} 
      name="select"
    >
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
