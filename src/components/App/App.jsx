import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando os componentes necessários

import Login from "../Login/Login.jsx"
import Layout from "../Layout/Layout.jsx"
import Signup from "../Signup/Signup.jsx"
import FinancialControl from "../Transactions/FinancialControl/FinancialControl.jsx"
import Goals from "../Goals/Goals.jsx"
import Category from "../Category/Category.jsx"
import Main from "../Main/Main.jsx"

function App() {
  return (

    <Router> 
      <Routes> 

        {/* sem sidebar */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />

        {/* com sidebar */}
        <Route path="/home" element={<Layout />}>
          <Route path="/home/main" element={<Main/>} />
          <Route path="/home/transactions" element={<FinancialControl />} />
          <Route path="/home/category" element={<Category />} />
          <Route path="/home/goals" element={<Goals />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
