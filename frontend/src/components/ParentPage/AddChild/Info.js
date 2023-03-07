
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";
import Table4 from "../../UI/Table4";

import styles from "./Info.module.scss";

const Info = ({ childAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const children = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);

    return (
        <div className={styles.info}>
            <Table4 children={children}/>
        </div>
    );
};

export default Info;
