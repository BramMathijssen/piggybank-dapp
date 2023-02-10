import React from "react";
import { Link } from "react-router-dom";
import piggy from "./../../assets/images/piggy.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oink Piggybank-crypto</h1>
        <h2 className={styles.subtitle}>Crypto piggybank made for children </h2>
        <Link to="/select-user">
          <button className={styles.button}>Enter App</button>
        </Link>
        <button className={styles.button2}>Learn more</button>
      </div>
      <div className={styles.headerImage}>
        <img src={piggy} className={styles.piggy} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
