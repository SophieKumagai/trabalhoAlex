import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando os componentes necessários

import Login from "../Login/Login.jsx"
import Menu from "../Menu/Menu.jsx"
import Cadastro from "../Cadastro/Cadastro.jsx"
import ControleFinanceiro from "../ControleFinanceiro/ControleFinanceiro.jsx"

function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/home" element={<Menu />} /> 
        <Route path="/controle" element={<ControleFinanceiro/>} />
      </Routes>
    </Router>
  );
}

export default App;
