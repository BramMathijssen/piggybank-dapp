import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./Panel.module.scss";


const Panel = (props) => {
    const ethersCtx = useContext(EthersContext);


    return <div className={styles.panel}>
        {props.children}
    </div>;
};

export default Panel;
