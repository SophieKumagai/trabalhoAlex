import { useState } from 'react';
import style from "./FinancialControl.module.css";
import Balance from "../Balance/Balance";
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionList from "../TransactionList/TransactionList";
import Loading from '../../Loading/Loading.jsx';
import loadingGif from '../../../assets/giphy.gif';

function FinancialControl() {
  let transactions = [];
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // traduzir o texto
  async function translateText ({text, targetLanguage}) {
    const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`);
    const data = await response.json();
    return data.translation;
  }

  async function getTransactions() {
    try {
      const data = await new Promise((resolve, reject) => {
        fetch(`https://expense-control-backend-8rmh.onrender.com/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(async (response) => {
            if (!response.ok) {
              response.json().then(data => {
                translateText({text: data.detail, targetLanguage: 'pt'}).then(translatedText => {
                  reject(translatedText);
                }).catch(error => {
                  reject('Erro ao traduzir a mensagem: ' + error.message);
                });
              });
            } else {
              response.json().then(data => {
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
      if (currency == 0) {
        setErrorMessage("Selecione uma moeda.");
        return;
      } else {
        setErrorMessage("");
      }
      
      if (amount <= 0) {
        setErrorMessage("O valor deve ser maior que zero.");
        return;
      } else {
        setErrorMessage("");
      }

      if (category == 0) {
        setErrorMessage("Selecione uma categoria.");
        return;
      } else {
        setErrorMessage("");
      }

      setIsLoading(true)

      try {
        const data = await new Promise((resolve, reject) => {
          fetch(`https://expense-control-backend-8rmh.onrender.com/transactions`, {
            method: 'POST',
            body: JSON.stringify({ date, description, title, amount, user, category, type, currency }),
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(async (response) => {
              if (!response.ok) {
                response.json().then(data => {
                  translateText({text: data.detail, targetLanguage: 'pt'}).then(translatedText => {
                    reject(translatedText);
                  }).catch(error => {
                    reject('Erro ao traduzir a mensagem: ' + error.message);
                  });
                });
              } else {
                response.json().then(data => {
                  setIsLoading(false)
                  // recarregar as transações

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

  const totalBalance = transactions.reduce((acc, t) => {
    return t.type === 1 ? acc + t.amount : acc - t.amount;
  }, 0);

  if (isLoading) {
    return (
      <Loading img={loadingGif} />
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
