import React, { useContext, useRef, useState, useEffect } from "react";
import ChildContext from "../../../context/child-context";
import EthersContext from "../../../context/ethers-context";
import EventsContext from "../../../context/events-context";
import { useEvent } from "../../../hooks/useEvent";
import ChildrenTable from "./ChildrenTable";

import styles from "./ChildrenOverview.module.scss";

const ChildrenOverview = (props) => {
    // const ethersCtx = useContext(EthersContext);
    // const eventsCtx = useContext(EventsContext);

    // we are using context to get children directly from chain instead of from events, since the children data is mutable
    const childCtx = useContext(ChildContext);

    //const children = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);
    const children = childCtx.children;

    // console.log(`---from info----`);
    // console.log(eventsCtx.tokens);

    console.log('in children overview')

    return (
        <div className={styles.childrenOverview}>
            <ChildrenTable children={children} />
        </div>
    );
};

export default ChildrenOverview;
