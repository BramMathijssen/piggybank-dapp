import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { useChildAddedEvents } from "../../../hooks/useChildAddedEvent";
import Badge from "./Badge";
import Child from "./Child";
import { Users, Coins, ArrowsLeftRight } from "phosphor-react";

import styles from "./HomePanel.module.scss";
import Panel from "./Panel";
import Row from "./Row";
import { useEvent } from "../../../hooks/useEvent";
import EventsContext from "../../../context/events-context";
import TransactionsTable from "./TransactionsTable";

const HomePanel = () => {
    const ethersCtx = useContext(EthersContext);
    const eventsCtx = useContext(EventsContext);
    // const myChildren = useChildAddedEvents(ethersCtx);
    const myChildren = useEvent("ChildAdded", ethersCtx.userAddress);
    const myTokens = useEvent("TokenCreated", ethersCtx.userAddress);
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();
    // const [myChildren, setMyChildren] = useState();

    // console.log(ethersCtx.userAddress);

    // console.log(parentAddress);
    // console.log(myClaim);

    // console.log(myChildren);
    //const seedDataTransactions = useEvent("AllowanceClaimed", null, ethersCtx.userAddress);

    console.log(eventsCtx.transactions);
    //console.log(seedDataTransactions)

    return (
        <>
            <div className={styles.badgeContainer}>
                <Badge type="children" amount={myChildren.length} icon={<Users size={50} />} />
                <Badge type="tokens" amount={myTokens.length} icon={<Coins size={50} />} />
                <Badge type="transactions" amount={212} icon={<ArrowsLeftRight size={50} />} />
            </div>
            <h2 className={styles.childTitle}>Your Children</h2>
            <div className={styles.childContainer}>
                {myChildren
                    ? myChildren.map((child, index) => {
                          return <Child name={child.name} address={child.childAddress} />;
                      })
                    : null}
            </div>
            <div className={styles.panelContainer}>
                <div className={styles.transactionsPanel}>
                    <h2 className={styles.transactionsTitle}>Recent Transactions</h2>
                    <Panel>
                        <TransactionsTable transactions={eventsCtx.transactions}/>
                    </Panel>
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
