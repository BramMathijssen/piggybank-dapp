import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import Badge from "./Badge";
import Child from "./Child";
import { Users, Coins, ArrowsLeftRight, Plus } from "phosphor-react";
import Panel from "../../UI/Panel";
import { useEvent } from "../../../hooks/useEvent";
import TransactionsTable from "./TransactionsTable";
import Tokens from "./Tokens";
import { useEventCustom } from "../../../hooks/useEventCustom";

import styles from "./HomePanel.module.scss";

const HomePanel = () => {
    const ethersCtx = useContext(EthersContext);
    const myChildren = useEvent("ChildAdded", ethersCtx.userAddress, ethersCtx.userAddress);
    const myTokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    // gets the 2nd and 4th index of the AllowanceClaimed event, in this case: child struct and timestamp.
    const myTransactions = useEventCustom("AllowanceClaimed", ethersCtx.userAddress, [2, 4], ethersCtx.userAddress);

    return (
        <>
            <div className={styles.badgeContainer}>
                <Badge type="children" amount={myChildren.length} icon={<Users size={42} />} />
                <Badge type="tokens" amount={myTokens.length} icon={<Coins size={42} />} />
                <Badge type="transactions" amount={myTransactions.length} icon={<ArrowsLeftRight size={42} />} />
            </div>
            <div className={styles.childTitle}>
                <h2 className={styles.title}>Your Children</h2>
                <Plus className={styles.iconPlus} size={22} />
            </div>
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

                    {/* <TransactionsTable transactions={eventsCtx.transactions} /> */}
                    {myTransactions && <TransactionsTable transactions={myTransactions} />}
                </div>
                <div className={styles.tokensPanel}>
                    <h2 className={styles.tokensTitle}>My Tokens</h2>
                    {ethersCtx.contract && <Tokens />}
                </div>
            </div>
        </>
    );
};

export default HomePanel;
