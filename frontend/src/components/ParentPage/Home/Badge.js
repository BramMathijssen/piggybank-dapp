import React from "react";

import styles from "./Badge.module.scss";

const Badge = ({ type, amount, icon }) => {
    return (
        <div className={styles.badge}>
            <div className={styles.content}>
                <p>{amount}</p>
                <p>{type}</p>
            </div>
            <div className={styles.icon}>
                <p>{icon}</p>
            </div>
        </div>
    );
};

export default Badge;
