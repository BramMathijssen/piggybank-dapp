import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../../context/ethers-context";
import ClaimCountdown from "./ClaimCountdown";
import Details from "./Details";
import TokenOverview from "./TokenOverview";
import TransactionsTable from "./TransactionsTable";

import styles from "./Panels.module.scss";


const Panels = () => {
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
            <div className={styles.rowContainer1}>
                <div className={styles.panelContainer}>
                    <h2>Hey</h2>
                    <div className={styles.countdownPanel}>
                        <ClaimCountdown child={child} setClaimed={setClaimed} claimed={claimed} />
                    </div>
                </div>
                <div className={styles.panelContainer}>
                    <h2>Hey</h2>
                    <div className={styles.detailsPanel}>
                        <Details child={child} parentAddress={parentAddress} />
                    </div>
                </div>
            </div>
            <div className={styles.rowContainer2}>
                <div className={styles.panelContainer}>
                    <h2>Hey</h2>
                    <div className={styles.transactionsPanel}>
                        <TransactionsTable child={child} claimed={claimed} />
                    </div>
                </div>
                <div className={styles.panelContainer}>
                    <h2>Hey</h2>
                    <div className={styles.overviewPanel}>
                        <TokenOverview child={child} parentAddress={parentAddress} claimed={claimed} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Panels;
