import React, { useContext, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import Badge from "./Badge";

import styles from "./HomePanel.module.scss";
import Row from "./Row";

const HomePanel = () => {
    const ethersCtx = useContext(EthersContext);

    // useEffect(() => {
    //     ethersCtx.onReConnect();
    // }, []);

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
