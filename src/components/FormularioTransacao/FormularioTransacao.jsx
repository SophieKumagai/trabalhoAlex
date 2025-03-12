import style from "./FormularioTransacao.module.css"
import Select from "../Select/Select";
function FormularioTransacao({ data, setData,
                               titulo, setTitulo,
                               descricao, setDescricao,
                               moeda, setMoeda,
                               valor, setValor, 
                               setTipo, 
                               categoria, setCategoria,
                               adicionarTransacao }) {
                                
  const moedas = [
    { id: '1', nome: 'Real' },
    { id: '2', nome: 'Dólar' },
    { id: '3', nome: 'Euro' },
    { id: '4', nome: 'Won' },
  ];

  const categorias = [
    { id: '1', nome: 'Alimentação' },
    { id: '2', nome: 'Saude' },
    { id: '3', nome: 'Lazer' },
    { id: '4', nome: 'Trabalho' }
  ]

  return (
    <div className={style.formContainer}>
      <div className={style.inputContainer}>
        <input
          type="date"
          placeholder="Data da transação"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={style.formInput}
          max={new Date().toISOString().split("T")[0]}
        />
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className={style.formInput}
        />
      </div>
      <div className={style.inputContainer}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className={style.formInput}
        />
        <label for="moeda">Moeda:</label>
        <Select opcoes={moedas} elemento={moeda} setElemento={setMoeda}/>
      </div>
      <div className={style.inputContainer}>
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={style.formInput}
        />
        <label for="categoria">Categoria:</label>
        <Select opcoes={categorias} elemento={categoria} setElemento={setCategoria}/>
      </div>
      <div className={style.formButtons}>
        <button onClick={() => {
          setTipo(0);
          adicionarTransacao()
        }} className={style.btnEntrada}>Entrada</button>
        
        <button onClick={() => {
          setTipo(1);
          adicionarTransacao()
        }} className={style.btnSaida}>Saída</button>
      </div>
    </div>
  );
}

export default FormularioTransacao