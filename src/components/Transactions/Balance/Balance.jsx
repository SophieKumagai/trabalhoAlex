import style from "./Balance.module.css";

function Balance({ totalBalance }) {
    return (
        <div className={style.balanceContainer}>
          <p className={style.balanceText}>Saldo total: R$ {totalBalance.toFixed(2)}</p>
        </div>
      );
}

export default Balance;
