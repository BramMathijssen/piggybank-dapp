import { poll } from "ethers/lib/utils";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./Info.module.scss";

const Info = ({ childAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const children = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);

    return (
        <div className={styles.info}>
            <p>hahah</p>
        </div>
    );
};

export default Info;
