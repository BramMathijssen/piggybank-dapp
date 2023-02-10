import React from "react";
import piggy from "./../assets/images/piggy.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oink Piggybank-crypto</h1>
        <h2 className={styles.subtitle}>Crypto piggybank made for children </h2>
        <button className="button">ENTER APP</button>
      </div>
      <div className="header-image">
        <img src={piggy} className="App-logo" alt="logo" />
      </div>
    </header>
  );
};

export default Header;