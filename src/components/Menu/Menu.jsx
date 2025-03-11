import React from 'react';
import style from "./Menu.module.css"
import img from "../../assets/loading.gif"
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import {FaChartBar, FaMoneyCheck, FaMedal} from 'react-icons/fa';

function Menu() {

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  const home = () => {
    navigate("/home")
  }

  return (
    <div className={style.mainMenu}>
      <div className={style.titulo}>
        <img src={img} alt="dinheiro" />
        <h2 onClick={home}>Controle</h2>
      </div>
      <div className={style.container}>
        <ul>
          <li>
            <NavLink to="/home/controle" end className={({ isActive }) => (isActive ? style.active : "")}>
              <FaChartBar className={style.icon} /> Resumo Financeiro
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/transacoes" className={({ isActive }) => (isActive ? style.active : "")}>
              <FaMoneyCheck className={style.icon} /> Transações
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/metas" className={({ isActive }) => (isActive ? style.active : "")}>
              <FaMedal className={style.icon} /> Metas
            </NavLink>
          </li>
          <li><a href="/" onClick={logout}>Sair</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
