import { useState } from 'react'
import style from "./ControleFinanceiro.module.css"
import Saldo from "../Saldo/Saldo"
import FormularioTransacao from '../FormularioTransacao/FormularioTransacao';
import ListaTransacoes from "../ListaTransacoes/ListaTransacoes"

function ControleFinanceiro() {
  const [transacoes, setTransacoes] = useState([]);
  const [data, setData] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [moeda, setMoeda] = useState(0);
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState(0);
  const [categoria, setCategoria] = useState(0)

  const adicionarTransacao = ({data, titulo, descricao, moeda, valor, tipo, categoria}) => {
    if (!data || !titulo || !descricao || !moeda || !valor || !tipo || !categoria) return "Informações incompletas.";
    
    setTransacoes([
      ...transacoes,
      { data: data,
        titulo: titulo,
        descricao:descricao,
        moeda: parseInt(moeda),
        valor: parseFloat(valor),
        tipo: parseInt(tipo),
        categoria: parseInt(categoria)},
    ]);

    setData("");
    setTitulo("");
    setDescricao("");
    setMoeda(0);
    setValor(0);
    setTipo(0);
    setCategoria(0);
  };

  const saldoTotal = transacoes.reduce((acc, t) => {
    return t.tipo === 0 ? acc + t.valor : acc - t.valor;
  }, 0);

  return (
    <div className={style.fundo}>
      <div className={style.container}>
        <h1 className={style.titulo}>Transações</h1>
        <Saldo saldoTotal={saldoTotal} />
        <FormularioTransacao
          descricao={descricao}
          setDescricao={setDescricao}
          valor={valor}
          setValor={setValor}
          adicionarTransacao={adicionarTransacao}
        />
      </div>

      <div className={style.container}>
        <ListaTransacoes transacoes={transacoes} />
      </div>
    </div>
  );

}

export default ControleFinanceiro
