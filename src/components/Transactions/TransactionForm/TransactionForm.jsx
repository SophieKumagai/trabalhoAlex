import style from "./TransactionForm.module.css";
import Select from "../Select/Select";

function TransactionForm({ 
  date, setDate,
  title, setTitle,
  description, setDescription,
  currency, setCurrency,
  amount, setAmount,
  category, setCategory,
  addTransaction 
}) {
  
  const currencies = [
    { id: '0', name: 'Não selecionado' },
    { id: '1', name: 'Real' },
    { id: '2', name: 'Dólar' },
    { id: '3', name: 'Euro' },
    { id: '4', name: 'Won' },
  ];

  const categories = [
    { id: '0', name: 'Não selecionado' },
    { id: '1', name: 'Alimentação' },
    { id: '2', name: 'Saúde' },
    { id: '3', name: 'Lazer' },
    { id: '4', name: 'Trabalho' }
  ];

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
        <Select options={currencies} element={currency} setElement={setCurrency}/>
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
        <Select options={categories} element={category} setElement={setCategory}/>
      </div>
      <div className={style.formButtons}>
        <button onClick={() => {
          addTransaction({ date, title, description, currency, amount, category, type: 1 });
        }} className={style.btnIncome}>Entrada</button>
        
        <button onClick={() => {
          addTransaction({ date, title, description, currency, amount, category, type: 2 });
        }} className={style.btnExpense}>Saída</button>
      </div>
    </div>
  );
}

export default TransactionForm;
