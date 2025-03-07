import React from 'react';
import style from "./Loading.module.css"

function Loading({img}) {
  return (
    <div className={style.loadingContainer}>
      <img src={img} alt="loading" />
    </div>
  );
};

export default Loading;