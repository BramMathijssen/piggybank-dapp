import { poll } from "ethers/lib/utils";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";
import Table from "../../UI/Table";
import Table2 from "../../UI/Table2";

import styles from "./Info.module.scss";

const Info = ({ childAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const children = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);

    return (
        <div className={styles.info}>
            <Table2 />
        </div>
    );
};

export default Info;
