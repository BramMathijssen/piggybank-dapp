import React, { useContext } from "react";
import EthersContext from "../../context/ethers-context";

import styles from "./ConnectWallet.module.scss";

const ConnectWallet = () => {
    const ethersCtx = useContext(EthersContext);

    return (
        <div className={styles.connectWalletContainer}>
            {ethersCtx.userAddress ? (
                <>
                    <div className={styles.connectionDetailsContainer}>
                        <p className={styles.userAddress}>{ethersCtx.userAddress}</p>
                        <div className={styles.chain}>
                            <p>{ethersCtx.chainId?.name}</p>
                        </div>
                    </div>
                    <div className={styles.connectContainer}>
                        <a className={styles.connect} >
                            Connected
                        </a>
                    </div>
                </>
            ) : (
                <div className={styles.unconnectedContainer}>
                    <a className={styles.unconnected} onClick={ethersCtx.onConnect}>
                        Connect
                    </a>
                </div>
            )}
        </div>
    );
};

export default ConnectWallet;
