import React from "react";
import User from "../components/SelectUserPage/User";

import styles from "../pages/SelectUser.module.scss";

const SelectUser = () => {
  return (
    <main className={styles.main}>
      <div className={styles.userContainer}>
        <User type="Parent" />
        <User type="Kid" />
      </div>
    </main>
  );
};

export default SelectUser;
