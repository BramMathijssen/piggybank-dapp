import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import ClaimCountdown from "./ClaimCountdown";
import Details from "./Details";
import TokenOverview from "./TokenOverview";
import Transactions from "./Transactions";

import styles from "./HomePanel.module.scss";

const HomePanelNew = () => {
    const [parentAddress, setParentAddress] = useState();
    const [child, setChild] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const [claimed, setClaimed] = useState(false);
    const ethersCtx = useContext(EthersContext);

    useEffect(() => {
        const initialiseChildData = async () => {
            if (!ethersCtx.contract) return;

            // get the child's parent address
            const tempParentAddress = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
            setParentAddress(tempParentAddress);

            // gets the child's data
            const tempChild = await ethersCtx.contract.parentToChildMappingNested(tempParentAddress, ethersCtx?.userAddress);
            setChild(tempChild);

            // get the current time of the contract in UNIX
            const currentTime = await ethersCtx.contract.getCurrentTime();

            // calculate the time left untill the child is able to claim their allowance
            const tempTimeLeft = tempChild.nextClaimPeriod.toNumber() - currentTime.toNumber();
            setTimeLeft(tempTimeLeft);
        };
        initialiseChildData();
    }, [ethersCtx, claimed]);

    return (
        <>
            <div className={styles.flexContainer}>
                <div className={styles.claimCountdownContainer}>
                    <h2 className={styles.title}>Claim</h2>
                    <ClaimCountdown child={child} setClaimed={setClaimed} claimed={claimed} />
                </div>
                <div className={styles.detailsContainer}>
                    <h2 className={styles.title}>Details</h2>
                    <Details child={child} parentAddress={parentAddress} setClaimed={setClaimed} claimed={claimed} />
                </div>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.transactionsContainer}>
                    <h2 className={styles.title}>Transactions</h2>
                    <Transactions child={child} setClaimed={setClaimed} claimed={claimed} />
                </div>
                <div className={styles.tokenOverviewContainer}>
                    <h2 className={styles.title}>TokenOverview</h2>
                    <TokenOverview child={child} parentAddress={parentAddress} setClaimed={setClaimed} claimed={claimed} />
                </div>
            </div>
        </>
    );
};

export default HomePanelNew;
