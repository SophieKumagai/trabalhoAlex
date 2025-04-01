import style from "./TransactionList.module.css";
import { FaRegCreditCard } from 'react-icons/fa';

function TransactionList({ transactions }) {
  return (
    <div className={style.listContainer}>
      <div className={style.title}>
        <FaRegCreditCard className={style.icon} />
        <h2 className={style.listTitle}>Extrato</h2>
      </div>
      {transactions.map((t) => (
        <div key={t.id} className={style.listItem}>
          <span>{t.description}</span>
          <span className={t.type === 1 ? style.textIncome : style.textExpense}>
            {t.type === 1 ? "+" : "-"} R$ {t.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
