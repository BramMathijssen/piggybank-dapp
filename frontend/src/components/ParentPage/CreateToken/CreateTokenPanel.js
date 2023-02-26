import React, { useContext, useRef, useState } from "react";
import Button from "../../UI/Button";
import { ContractFactory, ethers } from "ethers";

import { tokenCreatorAbi, tokenCreatorBytecode } from "../../../constants";

import styles from "./CreateTokenPanel.module.scss";
import EthersContext from "../../../context/ethers-context";

const CreateTokenPanel = () => {
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    const ethersCtx = useContext(EthersContext);

    const deployContract = async (e) => {
        e.preventDefault();
        console.log(`deploying contract...`);
        const factory = new ContractFactory(tokenCreatorAbi, tokenCreatorBytecode, ethersCtx.signer);
        const contract = await factory.deploy(contractSupplyRef.current.value, contractNameRef.current.value, contractSymbolRef.current.value);
        console.log(`contract deployed with address: `);
        console.log(contract.address);
    };

    return (
        <>
            <button onClick={() => ethersCtx.onConnect()}>Connect Wallet</button>
            <h2 className={styles.title}>Create New Token</h2>
            <div className={styles.createTokenPanel}>
                <form onSubmit={deployContract}>
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
