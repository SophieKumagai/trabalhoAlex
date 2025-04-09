import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import style from "./Main.module.css";
import Loading2 from '../Loading2/Loading2.jsx';
import loadingGif from '../../assets/giphy.gif';

function Main () {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const login = sessionStorage.getItem("login");
  
    if (login) {
      try {
        const response = await fetch(`https://expense-control-backend-8rmh.onrender.com/users/${login}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário.');
        }
  
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        window.alert(error.message || 'Erro ao carregar dados.');
      }
    } else {
      window.alert('O usuário precisa estar logado!');
    }
  };

  if (!data) {
    return (
      <Loading2 img={loadingGif} />
    );
  }

  const getProgressColor = (percent) => {
    if (percent >= 60) return "#fca61f"; // laranja (muito)
    if (percent >= 30) return "#3b82f6"; // azul (médio)
    return "#10b981";                    // verde (pouco)
  };

  return (
    <main className={style.main}>
      {/* Titulo */}
      <div className={style.content}>
        <h1 className={style.title}>Olá, {data.nm_first_name}!</h1>
        <p className={style.subtitle}>O resumo de suas transações está aqui</p>
        <div className={style.grid}>
          {/* Saldo */}
          <div className={style.card}>
            <h2 className={style.cardTitle}>Saldo</h2>
            <div className={style.cardContent}>
              <div className={style.balanceCard}>
                <p className={style.balance}>R${(data.amount.income - data.amount.outcome).toFixed(2)}</p>
                <p className={style.date}>Data: {new Date().toLocaleDateString()}</p>
              </div>
              <div className={style.transactions}>
                <p className={style.income}>+ R${data.amount.income} Entrada</p>
                <p className={style.outcome}>- R${data.amount.outcome} Saída</p>
              </div>
            </div>
          </div>
          
          {/* Metas */}
          <div className={style.goals}>
            <h2 className={style.goalsTitle}>Metas</h2>
            <div className={style.goalsContainer}>
              {Array.isArray(data.goals) && data.goals.map((goal, index) => (
                <div key={index} className={style.goalCard}>
                  <h3 className={style.goalAmount}>{goal.vl_goal}</h3>
                  <p className={style.goalTitle}>{goal.ds_title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transações */}
          <div className={style.card}>
            <h2 className={style.cardTitle}>Histórico de Transações</h2>
            <div className={style.cardContent}>
              <table className={style.transactionTable}>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data.transactions) && data.transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>
                        <span className={style.icon}>💫</span>
                        {transaction.ds_title}
                      </td>
                      <td>{transaction.type.ds_title}</td>
                      <td>{new Date(transaction.dt_transaction).toLocaleDateString()}</td>
                      <td className={style.amount}>R${transaction.vl_transaction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estatísticas*/}
          <div className={style.card} style={{ backgroundColor: 'transparent', boxShadow: 'none'}}>
            <h2 className={style.cardTitle}>Estatísticas de Gastos</h2>
            <div className={style.stats}>
              {Array.isArray(data.category_distribution?.categories) &&
                data.category_distribution.categories.map((category, index) => {
                    const percent = data.category_distribution.percentages[index] || 0;
                    const color = getProgressColor(percent);

                    return (
                      <div key={index} className={style.statItem}>
                        <div className={style.statIcon} style={{ backgroundColor: color, opacity: 0.5 }}>
                          <span>🎇</span>
                        </div>
                        <div className={style.statDetails}>
                          <p className={style.statLabel}>{category.ds_title}</p>
                          <div className={style.progressBarBackground}>
                            <div
                              className={style.progressBar}
                              style={{ width: `${percent}%`, backgroundColor: color }}
                            ></div>
                          </div>
                        </div>
                        <span className={style.statPercent}>{percent}%</span>
                      </div>
                    );
              })}
            </div>
          </div>
        
        </div>
      </div>
    </main>
  );
};

export default Main;
