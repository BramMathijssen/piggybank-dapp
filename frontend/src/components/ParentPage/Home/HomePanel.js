import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { useChildAddedEvents } from "../../../hooks/useChildAddedEvent";
import Badge from "./Badge";
import Child from "./Child";
import { Users, Coins, ArrowsLeftRight } from "phosphor-react";

import styles from "./HomePanel.module.scss";
import Panel from "./Panel";
import Row from "./Row";

const HomePanel = () => {
    const ethersCtx = useContext(EthersContext);
    const myChildren = useChildAddedEvents(ethersCtx);
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();
    // const [myChildren, setMyChildren] = useState();

    console.log(ethersCtx.userAddress);

    console.log(parentAddress);
    console.log(myClaim);

    // useEffect(() => {
    //     ethersCtx.onReConnect();
    // }, []);

    console.log(myChildren);

    return (
        <>
            <div className={styles.badgeContainer}>
                <Badge type="children" amount={myChildren.length} icon={<Users size={50}/>} />
                <Badge type="tokens" amount={2} icon={<Coins size={50}/>}/>
                <Badge type="transactions" amount={212} icon={<ArrowsLeftRight size={50}/>}/>
            </div>
            <h2 className={styles.childTitle}>Your Children</h2>
            <div className={styles.childContainer}>
                {myChildren
                    ? myChildren.map((child, index) => {
                          return <Child name={child.childName} address={child.childAddress} />;
                      })
                    : null}
                {/* <Child />
                <Child />
                <Child /> */}
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
