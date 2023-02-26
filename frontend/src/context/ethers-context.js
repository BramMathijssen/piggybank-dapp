import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddresses, parentContractAbi } from "../constants";

const EthersContext = React.createContext({
    userAddress: null,
    provider: null,
    signer: null,
    contract: null,
    onConnect: () => {},
});

export const EthersContextProvider = (props) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [chainId, setChainId] = useState(null);

    const connectWalletHandler = async () => {
        console.log(`clicky`);
        console.log(contractAddresses[31337]["ParentContract"][0]);
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                await updateEthers();
                setUserAddress(accounts[0]);
                console.log(contractAddresses);
                console.log(accounts[0]);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log(`please install MetaMask`);
        }
    };

    const updateEthers = async () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempChainId = await tempProvider.getNetwork();
        setChainId(tempChainId);

        let tempContract = new ethers.Contract(
            contractAddresses[tempChainId.chainId]["ParentContract"][0], // gets the contract address on local hardhat network
            parentContractAbi,
            tempSigner
        );
        setContract(tempContract);
    };

    return (
        <EthersContext.Provider
            value={{
                provider: provider,
                signer: signer,
                contract: contract,
                userAddress: userAddress,
                onConnect: connectWalletHandler,
            }}
        >
            {props.children}
        </EthersContext.Provider>
    );
};

export default EthersContext;
