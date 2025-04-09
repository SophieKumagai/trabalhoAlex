import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando os componentes necessários

import Login from "../Login/Login.jsx"
import Layout from "../Layout/Layout.jsx"
import Signup from "../Signup/Signup.jsx"
import FinancialControl from "../Transactions/FinancialControl/FinancialControl.jsx"
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
        transactions: [
          { receiver: "Tesco Market", type: "Shopping", date: "13 Dec 2020", amount: "75.67"},
          { receiver: "ElectroMen Market", type: "Shopping", date: "14 Dec 2020", amount: "250.00"},
          { receiver: "Fiogio Restaurant", type: "Food", date: "07 Dec 2020", amount: "19.50"},
          { receiver: "John Mathew Kayne", type: "Sport", date: "06 Dec 2020", amount: "350"},
          { receiver: "Ann Marlin", type: "Shopping", date: "31 Nov 2020", amount: "430"},
        ],
        statistics: [
          {
            label: "Shopping",
            percentage: 52,
            color: "#FC9354",
            bgColor: "#FFE9DB",
          },
          {
            label: "Electronics",
            percentage: 21,
            color: "#1FC26A",
            bgColor: "#DBF6E7",
          },
          {
            label: "Travels",
            percentage: 74,
            color: "#589BFF",
            bgColor: "#E3EDFF",
          },
          {
            label: "Travels",
            percentage: 74,
            color: "#589BFF",
            bgColor: "#E3EDFF",
          }
        ]
      });
    }, 1000);
  }, []);

  return (

    <Router> 
      <Routes> 

        {/* sem sidebar */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />

        {/* com sidebar */}
        <Route path="/home" element={<Layout />}>
          <Route path="/home/control" element={<FinancialControl />} />
          <Route path="/home/transactions" element={<FinancialControl />} />
          <Route path="/home/goals" element={<FinancialControl />} />
          <Route path="/home/main" element={<Main data={data}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
