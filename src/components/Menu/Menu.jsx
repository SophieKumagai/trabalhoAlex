import React from 'react';
import style from "./Menu.module.css"
import img from "../../assets/loading.gif"
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import {FaChartBar, FaMoneyCheck, FaMedal} from 'react-icons/fa';

function Menu() {

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  const home = () => {
    navigate("/home/principal")
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
            <NavLink to="/home/controle" end className={({ isActive }) => `${isActive ? style.active : style.link}`}>
              <FaChartBar className={style.icon} /> Resumo Financeiro
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/transacoes" end className={({ isActive }) => `${isActive ? style.active : style.link}`}>
              <FaMoneyCheck className={style.icon} /> Transações
            </NavLink>
          </li>
          <li>
          <NavLink to="/home/metas" end className={({ isActive }) => `${isActive ? style.active : style.link}`}>
            <FaMedal className={style.icon} /> Metas
          </NavLink>

          </li>
          <li><a href="/" className={style.link} onClick={logout}>Sair</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
