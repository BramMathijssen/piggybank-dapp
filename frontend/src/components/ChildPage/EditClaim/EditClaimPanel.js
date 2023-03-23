import React, { useContext, useState, useEffect } from "react";
import EditClaimPeriod from "./EditClaimPeriod";
import EditTokenPreference from "./EditTokenPreference";
import { motion } from "framer-motion";
import EthersContext from "../../../context/ethers-context";

import styles from "./EditClaimPanel.module.scss";

const EditClaimPanel = () => {
    const [parentAddress, setParentAddress] = useState();
    const [child, setChild] = useState();
    const [changed, setChanged] = useState(false);
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
    }, [ethersCtx, changed]);

    return (
        <motion.div className={styles.flexContainer} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.4 }}>
            {child && <EditClaimPeriod child={child} setChanged={setChanged} />}
            {child && <EditTokenPreference parentAddress={parentAddress} child={child} setChanged={setChanged} />}
        </motion.div>
    );
};

export default EditClaimPanel;
