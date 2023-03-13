import React, { useContext, useRef, useState, useEffect } from "react";
import Button from "../../UI/Button";
import EthersContext from "../../../context/ethers-context";

import styles from "./ConnectWallet.module.scss";
import { ethers } from "ethers";

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
                        <p>{ethersCtx.userAddress}</p>
                        <p>{ethersCtx.chainId?.name}</p>
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
