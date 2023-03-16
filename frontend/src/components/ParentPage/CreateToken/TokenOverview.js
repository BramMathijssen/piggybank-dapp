import React, { useContext} from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";
import TokenTable from "./TokenTable";

import styles from "./TokenOverview.module.scss";

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
