import { useState } from 'react'
import style from "./ControleFinanceiro.module.css"
import Saldo from "../Saldo/Saldo"
import FormularioTransacao from '../FormularioTransacao/FormularioTransacao';
import ListaTransacoes from "../ListaTransacoes/ListaTransacoes"

function ControleFinanceiro() {
  const [transacoes, setTransacoes] = useState([]);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const adicionarTransacao = (tipo) => {
    if (!valor || !descricao) return;
    setTransacoes([
      ...transacoes,
      { id: Date.now(), descricao, valor: parseFloat(valor), tipo },
    ]);
    setValor("");
    setDescricao("");
  };

  const saldoTotal = transacoes.reduce((acc, t) => {
    return t.tipo === "entrada" ? acc + t.valor : acc - t.valor;
  }, 0);

  return (
    <div className="container">
      <h1 className="titulo">Controle Financeiro</h1>
      <Saldo saldoTotal={saldoTotal} />
      <FormularioTransacao
        descricao={descricao}
        setDescricao={setDescricao}
        valor={valor}
        setValor={setValor}
        adicionarTransacao={adicionarTransacao}
      />
      <ListaTransacoes transacoes={transacoes} />
    </div>
  );

}

export default ControleFinanceiro
