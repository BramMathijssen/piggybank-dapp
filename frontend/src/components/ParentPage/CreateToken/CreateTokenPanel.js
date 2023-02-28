import React, { useContext, useRef, useState, useEffect } from "react";
import networksMapping from "../../../constants/networksMapping";

import styles from "./CreateTokenPanel.module.scss";
import EthersContext from "../../../context/ethers-context";


const CreateTokenPanel = () => {
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    const ethersCtx = useContext(EthersContext);


    const createToken = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = ethersCtx.contract.createNewToken(contractSupplyRef.current.value, contractNameRef.current.value, contractSymbolRef.current.value);
        console.log(tx);
    };


    const getStorage = () => {
        const storage = ethersCtx.storage;
        //const storage = localStorage.getItem("isWalletConnected");
        console.log(storage);
    };

    return (
        <>
            <button onClick={() => ethersCtx.onConnect()}>Connect Wallet</button>
            <button onClick={() => ethersCtx.onDisconnect()}>Disconnect</button>
            <button onClick={() => getStorage()}>Get Storage</button>
            <h2 className={styles.title}>Create New Token</h2>
            <div className={styles.createTokenPanel}>
                <form onSubmit={createToken}>
                    <div className={styles.container}>
                        <label>Contract Name</label>
                        <input type="text" ref={contractNameRef}></input>
                        <label>Symbol</label>
                        <input type="text" ref={contractSymbolRef}></input>
                        <label>Supply</label>
                        <input type="number" ref={contractSupplyRef}></input>
                        <button className={styles.button}> deploy</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateTokenPanel;
