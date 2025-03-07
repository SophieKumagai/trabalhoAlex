import React from 'react';
import style from "./Menu.module.css"

function Menu() {
  return (
    <div className={style.mainMenu}>
      <h1>Controle Financeiro</h1>
      <ul>
        <li><a href="#">Resumo Financeiro</a></li>
        <li><a href="#">Adicionar Despesa</a></li>
        <li><a href="#">Relatórios</a></li>
        <li><a href="#">Sair</a></li>
      </ul>
    </div>
  );
};

export default Menu;
