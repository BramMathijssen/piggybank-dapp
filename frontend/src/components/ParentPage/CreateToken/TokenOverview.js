import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import EventsContext from "../../../context/events-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./TokenOverview.module.scss";

const TokenOverview = ({ tokenAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const eventsCtx = useContext(EventsContext);
    const tokens = useEvent("TokenCreated", tokenAdded, ethersCtx.userAddress);

    useEffect(()=> {
        eventsCtx.setTokens(tokens);
    },[tokens])

    console.log(`rendering tokenoverview`)
    console.log(tokens)
    return (
        <div className={styles.overviewContainer}>
            <ul>
                {tokens &&
                    tokens.map((token, index) => {
                        return (
                            <li key={index}>
                                {token.name} {token.symbol}{" "}
                            </li>
                        );
                    })}
            </ul>
            TokenOverview
        </div>
    );
};

export default TokenOverview;
