import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import Timer from "../CountdownTimer";
import ClaimCountdown from "./ClaimCountdown";
import Details from "./Details";
import styles from "./HomePanelNew.module.scss";
import TokenOverview from "./TokenOverview";
import Transactions from "./Transactions";

const HomePanelNew = () => {
    return (
        <>
            <div className={styles.flexContainer}>
                <div className={styles.claimCountdownContainer}>
                    <h2 className={styles.title}>Claim</h2>
                    <ClaimCountdown />
                </div>
                <div className={styles.detailsContainer}>
                    <h2 className={styles.title}>Details</h2>
                    <Details />
                </div>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.transactionsContainer}>
                    <h2 className={styles.title}>Transactions</h2>
                    <Transactions />
                </div>
                <div className={styles.tokenOverviewContainer}>
                    <h2 className={styles.title}>TokenOverview</h2>
                    <TokenOverview />
                </div>
            </div>
        </>
    );
};

export default HomePanelNew;
