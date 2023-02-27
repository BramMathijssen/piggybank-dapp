import React, { useContext, useRef, useState, useEffect } from "react";
import Button from "../../UI/Button";
import { ContractFactory, ethers } from "ethers";
import networksMapping from "../../../constants/networksMapping";

import { tokenCreatorAbi, tokenCreatorBytecode } from "../../../constants";

import styles from "./CreateTokenPanel.module.scss";
import EthersContext from "../../../context/ethers-context";

const CreateTokenPanel = () => {
    const [network, setNetwork] = useState(null);
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    const ethersCtx = useContext(EthersContext);

    const getNetwork = () => {
        const chainId = ethersCtx.chainId;
        console.log(chainId);
        //const tempNetwork = networksMapping[chainId];
        //console.log(tempNetwork);

        setNetwork(chainId);
    };

    // const handleAccountsChanged = () => {
    //     console.log("legggooo");
    // };

    const createToken = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = ethersCtx.contract.createNewToken(contractSupplyRef.current.value, contractNameRef.current.value, contractSymbolRef.current.value);
        console.log(tx);
    };

    useEffect(() => {
        getNetwork();
    }, [ethersCtx.chainId]);

    async function isConnected() {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
            console.log(`You're connected to: ${accounts[0]}`);
        } else {
            console.log("Metamask is not connected");
        }
    }


    // useEffect(() => {
    //     async function listenMMAccount() {
    //         window.ethereum.on("accountsChanged", async function () {
    //             // Time to reload your interface with accounts[0]!
    //             const chainId = ethersCtx.chainId;
    //             setNetwork(chainId);
    //             ethersCtx.onReConnect();
    //             //window.location.reload();
    //         });
    //         window.ethereum.on("chainChanged", async function () {
    //             // Time to reload your interface with accounts[0]!
    //             const chainId = ethersCtx.chainId;
    //             setNetwork(chainId);
    //             window.location.reload();
    //             const accounts = await window.ethereum.request({ method: "eth_accounts" });
    //             console.log(accounts);
    //         });
    //         localStorage.setItem("status", "connected");
    //     }
    //     listenMMAccount();
    // }, []);

    const getStorage = () => {
        const storage = ethersCtx.storage;
        //const storage = localStorage.getItem("isWalletConnected");
        console.log(storage)
    }

    // useEffect(() => {
    //     window.ethereum?.on("accountsChanged", handleAccountsChanged);
    //     return () => {
    //         window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    //     };
    // });

    console.log(network);
    console.log(network?.name);

    return (
        <>
            <div>{network?.name}</div>
            <div>{ethersCtx.userAddress}</div>
            <button onClick={() => ethersCtx.onConnect()}>Connect Wallet</button>
            <button onClick={()=> ethersCtx.onDisconnect()}>Disconnect</button>
            <button onClick={()=> getStorage()}>Get Storage</button>
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
