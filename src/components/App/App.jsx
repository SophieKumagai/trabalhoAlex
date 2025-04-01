import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando os componentes necessários

import Login from "../Login/Login.jsx"
import Layout from "../Layout/Layout.jsx"
import Cadastro from "../Cadastro/Cadastro.jsx"
import ControleFinanceiro from "../ControleFinanceiro/ControleFinanceiro.jsx"
import Main from "../Main/Main.jsx"

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        name: "Milla",
        amount: 2850.75,
        data: "11/03/2025",
        income: 1500.50,
        outcome: 350.60,
        goals: [
          { title: "Holidays", amount: "$550" },
          { title: "Renovation", amount: "$200" },
          { title: "Xbox", amount: "$820" },
        ],
      });
    }, 1000);
  }, []);

  return (
    <Router> 
      <Routes> 

        {/* sem sidebar */}
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />

        {/* com sidebar */}
        <Route path="/home" element={<Layout />}>
          <Route path="/home/principal" element={<Main data={data}/>} />
          <Route path="/home/controle" element={<ControleFinanceiro />} />
          <Route path="/home/transacoes" element={<ControleFinanceiro />} />
          <Route path="/home/metas" element={<ControleFinanceiro />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
