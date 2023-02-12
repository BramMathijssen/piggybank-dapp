import React from "react";

import styles from "./Row.module.scss";

const Row = () => {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}></div>
      <div className={styles.content}></div>
    </div>
  );
};

export default Row;
