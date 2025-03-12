import style from "./Select.module.css";

function Select({ options, selectedOption, setSelectedOption }) {
  return (
    <>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className={style.option} id={selectedOption} name={selectedOption}>
        {options.map((item, index) => (
          <option key={index} value={item.id}> {item.name} </option>
        ))}
      </select>
    </>
  );
};

export default Select;
