import style from "./TransactionForm.module.css";
import Select from "../Select/Select";
import React, { useState, useEffect } from "react";

function TransactionForm({ 
  date, setDate,
  title, setTitle,
  description, setDescription,
  currency, setCurrency,
  amount, setAmount,
  category, setCategory,
  addTransaction,
  errorMessage, setErrorMessage
}) {
  
  useEffect(() => {
    getCategories();
    getCurrencies();
  })

  const user = sessionStorage.getItem("login");
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);

  // traduzir o texto
  async function translateText ({text, targetLanguage}) {
    const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
  }

  // Pegar as categorias do usuário
  async function getCategories() {
    try {
      const response = await fetch(`https://expense-control-backend-8rmh.onrender.com/users/${parseInt(user)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Erro desconhecido';
        const translatedText = await translateText({ text: errorMessage, targetLanguage: 'pt' });
        throw new Error(translatedText);
      }

      const list = await response.json();
      
      // Verifica se list.categories existe para evitar erros
      const newCategories = list.categories?.map(category => ({
        id: category.id,
        name: category.ds_title
      })) || [];

      setCategories(newCategories);
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage(error.message);
    }
  }

  // Pegar as moedas
  async function getCurrencies() {
    try {
      const response = await fetch(`https://expense-control-backend-8rmh.onrender.com/currencies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Erro desconhecido';
        const translatedText = await translateText({ text: errorMessage, targetLanguage: 'pt' });
        throw new Error(translatedText);
      }

      const list = await response.json();

      const newCurrencies = list?.map(currency => ({
        id: currency.id,
        name: currency.ds_title
      })) || [];

      setCurrencies(newCurrencies);
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className={style.formContainer}>
      <div className={style.inputContainer}>
        <input
          type="date"
          placeholder="Data da transação"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={style.formInput}
          max={new Date().toISOString().split("T")[0]}
        />
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={style.formInput}
        />
      </div>
      <div className={style.inputContainer}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={style.formInput}
        />
        <label htmlFor="currency">Moeda:</label>
        <Select options={currencies} selectedOption={currency} setSelectedOption={setCurrency} />
      </div>
      <div className={style.inputContainer}>
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={style.formInput}
        />
        <label htmlFor="category">Categoria:</label>
        <Select options={categories} selectedOption={category} setSelectedOption={setCategory} />
      </div>
      <p className={errorMessage ? style.error : style.hiddenError}>{errorMessage}</p>
      <div className={style.formButtons}>
        <button onClick={() => {
          addTransaction({ date, title, description, currency, amount, category, type: 1, user: user });
        }} className={style.btnIncome}>Entrada</button>
        
        <button onClick={() => {
          addTransaction({ date, title, description, currency, amount, category, type: 2, user: user });
        }} className={style.btnExpense}>Saída</button>
      </div>
    </div>
  );
}

export default TransactionForm;
