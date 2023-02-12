import React from "react";

import styles from "./Panel.module.scss";
import Row from "./Row";

const Panel = () => {
  return (
    <div className={styles.panel}>
      <h2>Panel Content</h2>
      <div className={styles.rowContainer}>
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
};

export default Panel;
