import React from "react";

import styles from "./Button.module.scss";

const Button = ({ type, onClick, size, content }) => {
  return (
    <button className={`${styles["button"]} ${styles[type]} ${styles[size]}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
