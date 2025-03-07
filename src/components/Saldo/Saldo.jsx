import style from "./Saldo.module.css"

function Saldo({ saldoTotal }) {
    return (
        <div className={style.saldoContainer}>
          <p className={style.saldoText}>Saldo Total: R$ {saldoTotal.toFixed(2)}</p>
        </div>
      );
}

export default Saldo