import { poll } from "ethers/lib/utils";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./TokenOverview.module.scss";

const TokenOverview = () => {
    const ethersCtx = useContext(EthersContext);
    const [events, setEvents] = useState([]);
    const [changed, setChanged] = useState();

    useEffect(() => {
        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.TokenCreated();
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            setEvents(events);
        };
        getEvents();
    }, [changed]);

    return <div className={styles.overviewContainer}>TokenOverview</div>;
};

export default TokenOverview;
