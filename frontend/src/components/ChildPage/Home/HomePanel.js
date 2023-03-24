import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import ClaimCountdown from "./ClaimCountdown";
import Details from "./Details";
import TokenOverview from "./TokenOverview";
import { motion } from "framer-motion";
import TransactionsTable from "./TransactionsTable";

import styles from "./HomePanel.module.scss";

const EMPTY_PARENTADDRESS = "0x0000000000000000000000000000000000000000";

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
            {parentAddress === EMPTY_PARENTADDRESS ? (
                <div>
                    <h2>You haven't been added by your parent yet.</h2>
                    <p>Ask your parent to add your adress to start earning!</p>
                </div>
            ) : (
                <motion.div className={styles.panels} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.4 }}>
                    <div className={styles.rowContainer1}>
                        <div className={styles.panelContainer}>
                            <h2>Claim</h2>
                            <div className={styles.countdownPanel}>
                                <ClaimCountdown child={child} setClaimed={setClaimed} claimed={claimed} />
                            </div>
                        </div>
                        <div className={styles.panelContainer}>
                            <h2>Details</h2>
                            <div className={styles.detailsPanel}>
                                <Details child={child} parentAddress={parentAddress} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.rowContainer2}>
                        <div className={styles.panelContainer}>
                            <h2>Recent Claims</h2>
                            <div className={styles.transactionsPanel}>
                                <TransactionsTable child={child} claimed={claimed} />
                            </div>
                        </div>
                        <div className={styles.panelContainer}>
                            <h2>Token Overview</h2>
                            <div className={styles.overviewPanel}>
                                <TokenOverview child={child} parentAddress={parentAddress} claimed={claimed} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default HomePanel;
