import React from "react";

import styles from "./AddChildPanel.module.scss";

const HomePanel = () => {
    return (
        <>
            <h2 className={styles.title}>Add Child Panel</h2>
            <div className={styles.rowContainer}></div>
        </>
    );
};

export default HomePanel;
