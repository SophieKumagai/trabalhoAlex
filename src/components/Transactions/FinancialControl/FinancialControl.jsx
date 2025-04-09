import { useState, useEffect } from 'react';
import style from "./FinancialControl.module.css";
import Balance from "../Balance/Balance";
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionList from "../TransactionList/TransactionList";
import Loading2 from '../../Loading2/Loading2.jsx';
import loadingGif from '../../../assets/giphy.gif';

function FinancialControl() {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState(1);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    getTransactions();
    total()
  })

  // traduzir o texto
  async function translateText ({text, targetLanguage}) {
    const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
  }

  async function getTransactions() {
    let user = sessionStorage.getItem("login");
    try {
      const data = await new Promise((resolve, reject) => {
        fetch(`https://expense-control-backend-8rmh.onrender.com/transactions/user/${parseInt(user)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(async (response) => {
            if (!response.ok) {
              response.json().then(data => {
                const details = data.detail;
                const errorMessages = Array.isArray(details)
                  ? details.map(item => item.msg).join(', ')
                  : details;
                translateText({text: errorMessages, targetLanguage: 'pt'}).then(translatedText => {
                  reject(translatedText);
                  setTransactions([])
                }).catch(error => {
                  reject('Erro ao traduzir a mensagem: ' + error.message);
                });
              });
            } else {
              response.json().then(data => {
                let list = data;
                console.log(list);
                const newTransactions = list;
                setTransactions(newTransactions);
                resolve(data);
              });
            }
          })
          .catch((error) => {
            reject('Erro na requisição: ' + error.message);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addTransaction ({ date, title, description, currency, amount, type, category, user }) {
    if (date && title && description) {

      // fazendo verificações
      if (amount <= 0) {
        setErrorMessage("O valor deve ser maior que zero.");
        return;
      } else {
        setErrorMessage("");
      }

      setIsLoading(true)

      try {
        const data = await new Promise((resolve, reject) => {
          fetch(`https://expense-control-backend-8rmh.onrender.com/transactions`, {
            method: 'POST',
            body: JSON.stringify({
              dt_transaction: date,
              ds_description: description,
              ds_title: title,
              vl_transaction: parseFloat(amount),
              fk_tb_users_id: parseInt(user),
              fk_tb_transaction_categories_id: parseInt(category),
              fk_tb_transaction_types_id: parseInt(type),
              fk_tb_currencies_id: parseInt(currency)
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(async (response) => {
              if (!response.ok) {
                response.json().then(data => {
                  const details = data.detail;
                  const errorMessages = Array.isArray(details)
                    ? details.map(item => item.msg).join(', ')
                    : details;
                  translateText({text: errorMessages, targetLanguage: 'pt'}).then(translatedText => {
                    reject(translatedText);
                  }).catch(error => {
                    reject('Erro ao traduzir a mensagem: ' + error.message);
                  });
                });
              } else {
                response.json().then(data => {
                  setIsLoading(false)
                  // recarregar as transações
                  getTransactions();
                  resolve(data);
                });
              }
            })
            .catch((error) => {
              setIsLoading(false)
              reject('Erro na requisição: ' + error.message);
            });
        });
      } catch (error) {
        setIsLoading(false)
        setErrorMessage(error);
      }

      setDate("");
      setTitle("");
      setDescription("");
      setCurrency(0);
      setAmount(0);
      setCategory(0);
    } else {
        setErrorMessage("Preencha todos os campos, por favor.");
        return;
    }
  };

  async function total() {
    let user = sessionStorage.getItem("login");
    try {
      const response = await fetch(`https://expense-control-backend-8rmh.onrender.com/users/amount/${parseInt(user)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        const details = errorData.detail;
        const errorMessages = Array.isArray(details)
          ? details.map(item => item.msg).join(', ')
          : details;
        const translatedText = await translateText({ text: errorMessages, targetLanguage: 'pt' });
        throw new Error(translatedText);
      }

      const list = await response.json();
      
      const income = list.income
      const outcome = list.outcome
      const newBalance = income - outcome
      setTotalBalance(newBalance);

    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage(error.message);
    }
  }

  if (isLoading) {
    return (
      <Loading2 img={loadingGif} />
    );
  } else {
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
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
        <div className={style.container}>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    );
  }
}

export default FinancialControl;
