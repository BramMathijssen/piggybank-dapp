import React from "react";
import Avatar from "./Avatar";
import { Link, NavLink } from "react-router-dom";

import styles from "./Sidebar.module.scss";

const Sidebar = ({setHomePanel, setEditClaimPanel}) => {
  console.log()

  const doSomething = (props) => {
    console.log(`doing it`)
  }
    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <Avatar />
            </div>
            <nav>
                <ul className={styles.ul}>
                    <li><button onClick={setHomePanel}>Home</button></li>
                    <li><button onClick={setEditClaimPanel}>Edit Claim</button></li>
                    {/* <li><button onClick={setCreateTokenPanel}>Create Token</button></li> */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
