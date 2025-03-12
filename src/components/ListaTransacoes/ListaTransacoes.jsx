import style from "./ListaTransacoes.module.css";
import {FaRegCreditCard} from 'react-icons/fa';

function ListaTransacoes({ transacoes }) {
  return (
    <div className={style.listaContainer}>
      <div className={style.titulo}>
        <FaRegCreditCard className={style.icon}/>
        <h2 className={style.listaTitulo}>Extrato</h2>
      </div>
      {transacoes.map((t) => (
        <div key={t.id} className={style.listaItem}>
          <span>{t.descricao}</span>
          <span className={t.tipo === 0 ? style.textoEntrada : style.textoSaida}>
            {t.tipo === 0 ? "+" : "-"} R$ {t.valor.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ListaTransacoes