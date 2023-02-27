import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddresses, parentContractAbi } from "../constants";
import networksMapping from "../constants/networksMapping";
import { useNavigate } from "react-router";

const EthersContext = React.createContext({
    userAddress: null,
    provider: null,
    signer: null,
    contract: null,
    chainId: null,
    isConnected: null,
    storage: null,
    onReConnect: () => {},
    setUserAddress: () => {},
    onConnect: () => {},
    onDisconnect: () => {},
});

export const EthersContextProvider = (props) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [storageContainer, setStorageContainer] = useState(localStorage?.getItem("isWalletConnected"));
    const navigate = useNavigate();

    useEffect(() => {
        const setGlobalListeners = () => {
            window.ethereum.on("chainChanged", async function () {
                console.log(`chain changed`);
                connectWalletHandler();
            });
            window.ethereum.on("accountsChanged", async function () {
                console.log(`account changed`);
                connectWalletHandler();
            });
        };
        setGlobalListeners();
    }, []);

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
                localStorage.setItem("isWalletConnected", true);
                const storage = localStorage?.getItem("isWalletConnected");
                setStorageContainer(storage);

                console.log(contractAddresses);
                console.log(accounts[0]);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log(`please install MetaMask`);
        }
    };

    const disconnectWalletHandler = async () => {
        console.log(`disconnecting`);
        localStorage.setItem("isWalletConnected", false);
        navigate("/select-user");
        window.location.reload();
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

    // const reConnectHandler = async () => {
    //     console.log(`reconnecting`);
    //     console.log(storageContainer);

    //     if (storageContainer) {
    //         console.log(`storage is true`);
    //         const accounts = await window.ethereum.request({ method: "eth_accounts" });
    //         if (accounts.length) {
    //             console.log(`You're connected to: ${accounts[0]}`);
    //             setUserAddress(accounts[0]);
    //         } else {
    //             console.log("Metamask is not connected");
    //         }
    //     }
    // };
    const reConnectHandler = async () => {
        if (storageContainer) {
            connectWalletHandler();
        }
    };

    return (
        <EthersContext.Provider
            value={{
                provider: provider,
                signer: signer,
                contract: contract,
                userAddress: userAddress,
                chainId: chainId,
                storage: storageContainer,
                setUserAddress: setUserAddress,
                onConnect: connectWalletHandler,
                onDisconnect: disconnectWalletHandler,
                onReConnect: reConnectHandler,
            }}
        >
            {props.children}
        </EthersContext.Provider>
    );
};

export default EthersContext;
