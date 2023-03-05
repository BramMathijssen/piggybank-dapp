import React from "react";

import styles from "./Button.module.scss";

const Button = ({ type, onClick, size, shape, content }) => {
  return (
    <button className={`${styles["button"]} ${styles[type]} ${styles[size]} ${styles[shape]}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
