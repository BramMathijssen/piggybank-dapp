import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddresses, parentContractAbi } from "../constants";
import { useNavigate } from "react-router";

const EthersContext = React.createContext({
    userAddress: null,
    provider: null,
    signer: null,
    contract: null,
    chainId: null,
    isConnected: null,
    storage: null,
    loading: null,
    setUserAddress: () => {},
    setLoading: () => {},
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
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const pageReload = () => {
        window.location.reload();
    };


    useEffect(() => {
        const setGlobalListeners = async () => {
            window.ethereum.on("chainChanged", async function () {
                pageReload();
            });
            window.ethereum.on("accountsChanged", async function () {
                connectWalletHandler();
            });
            window.onload = async () => {
                if (storageContainer) {
                    connectWalletHandler();
                }
            };
        };
        setGlobalListeners();
    }, []);

    const connectWalletHandler = async () => {
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
        setProvider(null);
        setSigner(null)
        setChainId(null)
        setContract(null)
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
                chainId: chainId,
                storage: storageContainer,
                loading: loading,
                setUserAddress: setUserAddress,
                setLoading: setLoading,
                onConnect: connectWalletHandler,
                onDisconnect: disconnectWalletHandler,
            }}
        >
            {props.children}
        </EthersContext.Provider>
    );
};

export default EthersContext;
