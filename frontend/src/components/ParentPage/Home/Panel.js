import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./Panel.module.scss";


const Panel = () => {
    const ethersCtx = useContext(EthersContext);


    return <div className={styles.panel}>

    </div>;
};

export default Panel;
