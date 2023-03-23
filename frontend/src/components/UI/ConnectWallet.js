import React, { useContext } from "react";
import EthersContext from "../../context/ethers-context";

import styles from "./ConnectWallet.module.scss";

const ConnectWallet = () => {
    const ethersCtx = useContext(EthersContext);

    const clickHandler = (e) => {
        e.preventDefault();
        console.log(`clicked`);
    };
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
                        <a className={styles.connect} onClick={clickHandler}>
                            CONNECTED
                        </a>
                    </div>
                    {/* <Button onClick={clickHandler} content="Connected" size="small"></Button> */}
                </>
            ) : (
                <div className={styles.unconnectedContainer}>
                    <a className={styles.unconnected} onClick={ethersCtx.onConnect}>
                        Connect
                    </a>
                    {/* <Button onClick={ethersCtx.onConnect} content="Connect" size="small"></Button> */}
                </div>
            )}
        </div>
    );
};

export default ConnectWallet;
