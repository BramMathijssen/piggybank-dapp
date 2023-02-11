import React from "react";
import Avatar from "./Avatar";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar />
      </div>
      <ul className={styles.ul}>
        <li>Home</li>
        <li>Create New Token</li>
        <li>Add New Subscriber</li>
      </ul>
    </div>
  );
};

export default Sidebar;
