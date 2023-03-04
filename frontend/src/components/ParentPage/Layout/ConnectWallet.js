import React, { useContext, useRef, useState, useEffect } from "react";
import Button from "../../UI/Button";
import EthersContext from "../../../context/ethers-context";

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
                    <p>{ethersCtx.userAddress}</p>
                    <p>{ethersCtx.chainId?.name}</p>
                    <Button onClick={clickHandler} content="Connected" size="small"></Button>
                </>
            ) : (
                <>
                    <Button onClick={ethersCtx.onConnect} content="Connect" size="small"></Button>
                </>
            )}
        </div>
    );
};

export default ConnectWallet;
