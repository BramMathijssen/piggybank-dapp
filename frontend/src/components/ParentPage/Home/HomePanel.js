import React from "react";

import styles from "./HomePanel.module.scss";
import Row from "./Row";

const HomePanel = () => {
    return (
        <>
            <h2 className={styles.title}>Panel Content</h2>
            <div className={styles.rowContainer}>
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
            </div>
        </>
    );
};

export default HomePanel;
