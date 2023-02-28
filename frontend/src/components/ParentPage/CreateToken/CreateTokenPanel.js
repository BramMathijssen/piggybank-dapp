import React, { useContext, useRef, useState, useEffect } from "react";
import networksMapping from "../../../constants/networksMapping";

import styles from "./CreateTokenPanel.module.scss";
import EthersContext from "../../../context/ethers-context";
import TokenOverview from "./TokenOverview";

const CreateTokenPanel = () => {
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();
    const [events, setEvents] = useState([{ "name ": "bla"}]);
    const [changed, setChanged] = useState();

    const ethersCtx = useContext(EthersContext);

    const createToken = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.createNewToken(contractSupplyRef.current.value, contractNameRef.current.value, contractSymbolRef.current.value);
        await tx.wait(1);
        console.log(tx);
        setChanged("1");
    };

    const getStorage = () => {
        const storage = ethersCtx.storage;
        //const storage = localStorage.getItem("isWalletConnected");
        console.log(storage);
    };

    useEffect(() => {
        console.log(`running events getters`);
        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.TokenCreated();
            const eventsFiltered = await ethersCtx.contract.queryFilter(eventFilter);

            // setEvents(oldArray => [...oldArray, {eventsFiltered}]);
            setEvents([eventsFiltered]);
        };
        getEvents();
    }, [changed]);

    console.log(events);

    return (
        <>
            <h2 className={styles.title}>Create New Token</h2>
            <div className={styles.createTokenPanel}>
                <div className={styles.createContainer}>
                    <form onSubmit={createToken}>
                        <div className={styles.formContainer}>
                            <label>Token Name</label>
                            <input type="text" ref={contractNameRef}></input>
                            <label>Symbol</label>
                            <input type="text" ref={contractSymbolRef}></input>
                            <label>Supply</label>
                            <input type="number" ref={contractSupplyRef}></input>
                            <button className={styles.button}> deploy</button>
                        </div>
                    </form>
                </div>
                <TokenOverview />
            </div>
        </>
    );
};

export default CreateTokenPanel;
