import style from "./FormularioTransacao.module.css"

function FormularioTransacao({ descricao, setDescricao, valor, setValor, adicionarTransacao }) {
  return (
    <div className={style.formContainer}>
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className={style.formInput}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className={style.formInput}
      />
      <div className={style.formButtons}>
        <button onClick={() => adicionarTransacao("entrada")} className={style.btnEntrada}>Entrada</button>
        <button onClick={() => adicionarTransacao("saida")} className={style.btnSaida}>Saída</button>
      </div>
    </div>
  );
}

export default FormularioTransacao