import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando os componentes necessários

import Login from "../Login/Login.jsx"
import Layout from "../Layout/Layout.jsx"
import Cadastro from "../Cadastro/Cadastro.jsx"
import ControleFinanceiro from "../ControleFinanceiro/ControleFinanceiro.jsx"

function App() {
  return (
    <Router> 
      <Routes> 

        {/* sem sidebar */}
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />

        {/* com sidebar */}
        <Route path="/home" element={<Layout />}>
          <Route path="/home/controle" element={<ControleFinanceiro />} />
          <Route path="/home/transacoes" element={<ControleFinanceiro />} />
          <Route path="/home/metas" element={<ControleFinanceiro />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
