import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import Badge from "./Badge";
import Child from "./Child";

import styles from "./HomePanel.module.scss";
import Panel from "./Panel";
import Row from "./Row";

const HomePanel = () => {
    const ethersCtx = useContext(EthersContext);
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();

    console.log(ethersCtx.userAddress);

    console.log(parentAddress);
    console.log(myClaim);

    // useEffect(() => {
    //     ethersCtx.onReConnect();
    // }, []);

    return (
        <>
            <div className={styles.badgeContainer}>
                <Badge />
                <Badge />
                <Badge />
            </div>
            <h2 className={styles.childTitle}>Your Children</h2>
            <div className={styles.childContainer}>
                <Child />
                <Child />
                <Child />
            </div>

            <div className={styles.panelContainer}>
                <div className={styles.transactionsPanel}>
                    <h2 className={styles.transactionsTitle}>Recent Transactions</h2>
                    <Panel />
                </div>
                <div className={styles.tokensPanel}>
                <h2 className={styles.tokensTitle}>My Tokens</h2>
                    <Panel />
                </div>
                {/* <div className={styles.rowContainer}>
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
                </div> */}
            </div>
        </>
    );
};

export default HomePanel;
