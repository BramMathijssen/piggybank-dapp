import React from "react";
import Avatar from "./Avatar";

import styles from "./Sidebar.module.scss";

const Sidebar = ({ links }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar />
      </div>
      <nav>
        <ul className={styles.ul}>
          {links.map((link, index) => (
            <li className={styles.li} key={index}>
              <a className={styles.link} onClick={link.onClick}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;