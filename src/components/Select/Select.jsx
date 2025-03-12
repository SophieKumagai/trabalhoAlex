import style from "./Select.module.css";
function Select ({ opcoes, elemento, setElemento }) {
  return (
    <>
        <select value={elemento} onChange={(e) => setElemento(e.target.value)} className={style.moeda} id={elemento} name={elemento}>
            {opcoes.map((item, index) => (
                <option key={index} value={item.id}> {item.nome} </option>
            ))}
        </select>
    </>
  );
};

export default Select;
