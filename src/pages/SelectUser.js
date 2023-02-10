import React from "react";
import User from "../components/selectuserpage/User";

import styles from "../pages/SelectUser.module.scss";

const SelectUser = () => {
  return (
    <main className={styles.main}>
      <div className={styles.flexContainer}>
        <User type="Parent" />
        <User type="Kid" />
      </div>
    </main>
  );
};

export default SelectUser;
