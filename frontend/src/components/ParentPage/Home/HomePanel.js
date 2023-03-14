import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import Badge from "./Badge";
import Child from "./Child";
import { Users, Coins, ArrowsLeftRight } from "phosphor-react";

import styles from "./HomePanel.module.scss";
import Panel from "../../UI/Panel";
import { useEvent } from "../../../hooks/useEvent";
import EventsContext from "../../../context/events-context";
import TransactionsTable from "./TransactionsTable";
import ChildContext from "../../../context/child-context";
import TransactionContext from "../../../context/transaction-context";
import Tokens from "./Tokens";
import { useEventCustom } from "../../../hooks/useEventCustom";

const HomePanel = () => {
    const ethersCtx = useContext(EthersContext);
    // const transactionCtx = useContext(TransactionContext);

    const myChildren = useEvent("ChildAdded", ethersCtx.userAddress, ethersCtx.userAddress);
    const myTokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    // gets the 2nd and 4th index of the AllowanceClaimed event, in this case: child struct and timestamp.
    const myTransactions = useEventCustom("AllowanceClaimed", ethersCtx.userAddress, [2, 4], ethersCtx.userAddress);

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
                          return <Child key={index} name={child.name} address={child.childAddress} />;
                      })
                    : null}
            </div>
            <div className={styles.panelContainer}>
                <div className={styles.transactionsPanel}>
                    <h2 className={styles.transactionsTitle}>Recent Transactions</h2>
                    <Panel>
                        {/* <TransactionsTable transactions={eventsCtx.transactions} /> */}
                        {myTransactions && <TransactionsTable transactions={myTransactions} />}
                    </Panel>
                </div>
                <div className={styles.tokensPanel}>
                    <h2 className={styles.tokensTitle}>My Tokens</h2>
                    <Panel>{ethersCtx.contract && <Tokens />}</Panel>
                </div>
            </div>
        </>
    );
};

export default HomePanel;
