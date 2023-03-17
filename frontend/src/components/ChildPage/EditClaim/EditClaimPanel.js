import React, { useContext, useRef, useState, useEffect } from "react";
import EditClaimPeriod from "./EditClaimPeriod";
import EditTokenPreference from "./EditTokenPreference";

import styles from "./EditClaimPanel.module.scss";
import EthersContext from "../../../context/ethers-context";

const EditClaimPanel = () => {
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
        <div className={styles.flexContainer}>
            {child &&<EditClaimPeriod child={child}/>}
            {child && <EditTokenPreference parentAddress={parentAddress} child={child}/> }
        </div>
    );
};

export default EditClaimPanel;
