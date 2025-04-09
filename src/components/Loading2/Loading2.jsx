import React from 'react';
import style from "./Loading2.module.css"

function Loading2({img}) {
  return (
    <div className={style.loadingContainer}>
      <img src={img} alt="loading" />
    </div>
  );
};

export default Loading2;