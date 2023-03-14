import React, { useContext, useRef, useState, useEffect } from "react";
import ChildContext from "../../../context/child-context";
import EthersContext from "../../../context/ethers-context";
import EventsContext from "../../../context/events-context";
import { useEvent } from "../../../hooks/useEvent";
import Table from "../../UI/Table";

import styles from "./Info.module.scss";

const Info = ({ childAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const eventsCtx = useContext(EventsContext)
    const childCtx = useContext(ChildContext)

    //const children = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);
    const children = childCtx.children;

    console.log(`---from info----`)
    console.log(eventsCtx.tokens)

    return (
        <div className={styles.info}>
            <Table children={children}/>
        </div>
    );
};

export default Info;
