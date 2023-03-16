import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import EventsContext from "../../../context/events-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./TokenOverview.module.scss";
import TokenTable from "./TokenTable";

const TokenOverview = ({ tokenAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", tokenAdded, ethersCtx.userAddress);

    return (
        <div className={styles.tokenOverview}>
            {tokens && <TokenTable tokens={tokens} />}
        </div>
    );
};

export default TokenOverview;
