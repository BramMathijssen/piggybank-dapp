import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import ClaimCountdown from "./ClaimCountdown";
import Details from "./Details";
import TokenOverview from "./TokenOverview";
import Transactions from "./Transactions";

import styles from "./HomePanel.module.scss";
import Panels from "./TestFlex/Panels";

const HomePanel = () => {
    const [parentAddress, setParentAddress] = useState();
    const [child, setChild] = useState();
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
        };
        initialiseChildData();
    }, [ethersCtx, claimed]);

    return (
        <>
            {/* <Panels /> */}
            <div className={styles.flexContainer}>
                <div className={styles.claimCountdownContainer}>
                    <h2 className={styles.title}>Claim</h2>
                    <ClaimCountdown child={child} setClaimed={setClaimed} claimed={claimed} />
                </div>
                <div className={styles.detailsContainer}>
                    <h2 className={styles.title}>Details</h2>
                    <Details child={child} parentAddress={parentAddress}/>
                </div>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.transactionsContainer}>
                    <h2 className={styles.title}>Transactions</h2>
                    <Transactions child={child} claimed={claimed} />
                </div>
                <div className={styles.tokenOverviewContainer}>
                    <h2 className={styles.title}>TokenOverview</h2>
                    <TokenOverview child={child} parentAddress={parentAddress} claimed={claimed} />
                </div>
            </div>
        </>
    );
};

export default HomePanel;
