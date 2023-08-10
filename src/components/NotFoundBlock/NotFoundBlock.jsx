import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>Ничего не найдено :(</span>
      </h1>
      <p className={styles.desc}>К сожалению, данная страница отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
