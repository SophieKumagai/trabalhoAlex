import style from "./Balance.module.css";

function Balance({ totalBalance }) {
    return (
        <div className={style.balanceContainer}>
          <p className={style.balanceText}>Saldo total: R$ {totalBalance > 0 ? totalBalance.toFixed(2) : totalBalance}</p>
        </div>
      );
}

export default Balance;
