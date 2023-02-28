import React, { useContext } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./AddChildPanel.module.scss";

const AddChildPanel = () => {
    const ethersCtx = useContext(EthersContext);
    return (
        <>
            <h2 className={styles.title}>Add New Child</h2>
            <div className={styles.addChildPanel}></div>
        </>
    );
};

export default AddChildPanel;
