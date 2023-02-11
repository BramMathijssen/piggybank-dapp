import React from "react";
import Button from "../UI/Button";

import styles from "./User.module.scss";

const User = ({ type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{type}</div>
      <div className={styles.content}>
        <p>Hey im content</p>
      </div>
      <div className={styles.action}>
        <Button type="confirm" size="medium" content="Start" />
      </div>
    </div>
  );
};

export default User;
