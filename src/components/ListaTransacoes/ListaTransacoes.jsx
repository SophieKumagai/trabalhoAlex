import style from "./ListaTransacoes.module.css";

function ListaTransacoes({ transacoes }) {
  return (
    <div className={style.listaContainer}>
      <h2 className={style.listaTitulo}>Transações</h2>
      {transacoes.map((t) => (
        <div key={t.id} className={style.listaItem}>
          <span>{t.descricao}</span>
          <span className={t.tipo === "entrada" ? style.textoEntrada : style.textoSaida}>
            {t.tipo === "entrada" ? "+" : "-"} R$ {t.valor.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ListaTransacoes