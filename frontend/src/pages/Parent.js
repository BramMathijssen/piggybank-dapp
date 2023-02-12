import React from "react";
import Badge from "../components/ParentPage/Badge";
import Panel from "../components/ParentPage/Panel";
import Sidebar from "../components/ParentPage/Sidebar";

import styles from "./Parent.module.scss";

const Parent = () => {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.badgeContainer}>
          <Badge />
          <Badge />
          <Badge />
        </div>
        <div className={styles.panelContainer}>
          <Panel />
        </div>
      </div>
    </main>
  );
};

export default Parent;
