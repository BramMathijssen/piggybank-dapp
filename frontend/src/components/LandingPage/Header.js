import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import piggy from "./../../assets/images/piggy.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Crypto-Piggybank</h1>
        <h2 className={styles.subtitle}>Crypto piggybank made for children </h2>
        <Link to="/select-user">
          <Button type='confirm' size='large' content='Enter App'/>
        </Link>
        <Button type='info' size='large' content='Learn more'/>
      </div>
      <div className={styles.headerImage}>
        <img src={piggy} className={styles.piggy} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
