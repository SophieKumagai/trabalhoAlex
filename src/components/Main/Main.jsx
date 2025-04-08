import React from 'react';
import { FaChartLine, FaShoppingCart, FaBullseye } from "react-icons/fa";

import style from "./Main.module.css";
import Loading from '../Loading/Loading.jsx';
import loadingGif from '../../assets/giphy.gif';

function Main ({ data }) {
  if (!data) {
    return (
      <Loading img={loadingGif} />
    );
  }

  return (
    <main className={style.main}>
      {/* Titulo */}
      <div className={style.content}>
        <h1 className={style.title}>Olá, {data.name}!</h1>
        <p className={style.subtitle}>O resumo de suas transações está aqui</p>
        
        {/* Saldo */}
        <div className={style.card}>
          <h2 className={style.cardTitle}>Saldo</h2>
          <div className={style.cardContent}>
            <div className={style.balanceCard}>
              <p className={style.balance}>${data.amount}</p>
              <p className={style.date}>Data: {data.data}</p>
            </div>
            <div className={style.transactions}>
              <p className={style.income}>+ ${data.income} Entrada</p>
              <p className={style.outcome}>- ${data.outcome} Saída</p>
            </div>
          </div>
        </div>
        
        {/* Metas */}
        <div className={style.goals}>
          {data.goals.map((goal, index) => (
            <div key={index} className={style.goalCard}>
              <h3 className={style.goalAmount}>{goal.amount}</h3>
              <p className={style.goalTitle}>{goal.title}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Main;
