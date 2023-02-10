import React from "react";

import styles from "./User.module.scss";

const User = ({type}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{type}</div>
      <div className={styles.content}></div>
    </div>
  );
};

export default User;
