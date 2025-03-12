import { useState } from 'react';
import style from "./FinancialControl.module.css";
import Balance from "../Balance/Balance";
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionList from "../TransactionList/TransactionList";

function FinancialControl() {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(0);

  const addTransaction = ({ date, title, description, currency, amount, type, category }) => {
    if (date && title && description && currency && amount && type && category) {
      console.log(date, title, description, currency, amount, type, category);

      setTransactions([
        ...transactions,
        { 
          date: date,
          title: title,
          description: description,
          currency: parseInt(currency),
          amount: parseFloat(amount),
          type: parseInt(type),
          category: parseInt(category)
        },
      ]);

      setDate("");
      setTitle("");
      setDescription("");
      setCurrency(0);
      setAmount(0);
      setCategory(0);
    } else {
      console.log(date, title, description, currency, amount, type, category);
      console.log("Incomplete information.");
      return "Preencha todos os campos, por favor.";
    }
  };

  const totalBalance = transactions.reduce((acc, t) => {
    return t.type === 1 ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <div className={style.background}>
      <div className={style.container}>
        <h1>Transações</h1>
        <Balance totalBalance={totalBalance} />
        <TransactionForm
          date={date}
          setDate={setDate}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          currency={currency}
          setCurrency={setCurrency}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          addTransaction={addTransaction}
        />
      </div>

      <div className={style.container}>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default FinancialControl;
