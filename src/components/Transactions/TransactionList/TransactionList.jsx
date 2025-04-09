import style from "./TransactionList.module.css";
import { FaRegCreditCard } from "react-icons/fa";
import { useState, useEffect } from "react";

function TransactionList({ transactions }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState({});

  async function translateText(text, targetLanguage) {
    try {
      const response = await fetch(
        `https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`
      );
      const data = await response.json();
      return data.translation;
    } catch (error) {
      console.error("Erro na tradução:", error);
      return text;
    }
  }

  async function getCategory(id) {
    try {
      const response = await fetch(
        `https://expense-control-backend-8rmh.onrender.com/transaction-categories/${id}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        const details = errorData.detail;
        const errorMessages = Array.isArray(details)
          ? details.map(item => item.msg).join(', ')
          : details;
        const translatedText = await translateText({ text: errorMessages, targetLanguage: 'pt' });
        throw new Error(translatedText);
      }
      const categoryData = await response.json();
      return categoryData.ds_title;
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      return "Erro ao carregar";
    }
  }

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      setErrorMessage("Nenhuma transação encontrada.");
      return;
    }
    
    const fetchCategories = async () => {
      const newCategories = {};
      for (const t of transactions) {
        if (!newCategories[t.fk_tb_transaction_categories_id]) {
          newCategories[t.fk_tb_transaction_categories_id] = await getCategory(t.fk_tb_transaction_categories_id);
        }
      }
      setCategories(newCategories);
    };
      fetchCategories();
    }, [transactions]);

  return (
    <div className={style.listContainer}>
      <div className={style.title}>
        <FaRegCreditCard className={style.icon} />
        <h2 className={style.listTitle}>Extrato</h2>
      </div>
      <div className={style.description}>
        <span className={style.text}>Data</span>
        <span className={style.text}>Título</span>
        <span className={style.text}>Descrição</span>
        <span className={style.text}>Categoria</span>
        <span className={style.text}>Valor</span>
      </div>
      {transactions && transactions.length > 0 ? (
        transactions.map((t) => (
            <div key={t.id} className={style.transactionItem}>
              <span className={style.transactionDate}>{new Date(t.dt_transaction).toLocaleDateString()}</span>
              <span className={style.transactionName}>{t.ds_title}</span>
              <span className={style.transactionDescription}>{t.ds_description}</span>
              <span className={style.transactionDescription}>
                {categories[t.fk_tb_transaction_categories_id] || "Carregando..."}
              </span>
              <span
                className={`${style.transactionValue} ${
                  t.type.id === 1 ? style.textIncome : style.textExpense
                }`}
              >
                {t.type.id === 1 ? "+" : "-"} {t.currency.cd_iso} {t.vl_transaction}
              </span>
            </div>
        ))
      ) : (
        <p className={style.emptyMessage}>{errorMessage}</p>
      )}
    </div>
  );
}

export default TransactionList;