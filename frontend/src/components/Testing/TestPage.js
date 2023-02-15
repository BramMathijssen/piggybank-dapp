import React, { useRef, useState } from "react";
import { ContractFactory, ethers } from "ethers";

import styles from "./TestPage.module.scss";
import { tokenCreatorAbi, tokenCreatorBytecode } from "../../constants";

const TestPage = () => {
    const [userAddress, setUserAddress] = useState();
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const chainId = provider.getNetwork();

    async function connectToMetamask() {
        console.log(`yooo`);
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);

        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        console.log(userAddress);

        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const accounts = await provider.send("eth_requestAccounts", []);
        // this.setState({ selectedAddress: accounts[0] })
    }

    const deployContract = async (e) => {
        e.preventDefault();
        console.log(`deploying contract...`);
        const factory = new ContractFactory(tokenCreatorAbi, tokenCreatorBytecode, signer);
        const contract = await factory.deploy(contractSupplyRef.current.value, contractNameRef.current.value, contractSymbolRef.current.value);
        console.log(`contract deployed with address: `);
        console.log(contract.address);
    };

    // console.log(userAddress);
    // console.log(window.ethereum);

    console.log(provider);
    console.log(signer);

    return (
        <div>
            <button onClick={connectToMetamask}>Connect</button>
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
    );
};

export default TestPage;
