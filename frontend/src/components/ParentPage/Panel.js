import React from "react";

import styles from "./Panel.module.scss";
import Row from "./Row";

const Panel = () => {
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

export default Panel;
