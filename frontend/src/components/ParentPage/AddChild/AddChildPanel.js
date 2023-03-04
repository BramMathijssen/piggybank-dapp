import React, { useContext, useRef, useState, useEffect } from "react";
import networksMapping from "../../../constants/networksMapping";

import styles from "./AddChildPanel.module.scss";
import EthersContext from "../../../context/ethers-context";
import ChildOverview from "./ChildOverview";
import { useEvent } from "../../../hooks/useEvent";

const AddChildPanel = () => {
    const childNameRef = useRef();
    const childAddressRef = useRef();
    const baseAmountRef = useRef();
    const tokenPreferenceRef = useRef();

    const [changed, setChanged] = useState(false);

    const ethersCtx = useContext(EthersContext);
    
    //const [tokens, setTokens] = useState();
    const tokens = useEvent("TokenCreated", changed, ethersCtx.userAddress);

    const addChild = async (e) => {
        e.preventDefault();
        console.log(`Adding new child`);
        console.log(childAddressRef.current.value);
        const tx = await ethersCtx.contract.addChild(childNameRef.current.value, childAddressRef.current.value, tokenPreferenceRef.current.value, baseAmountRef.current.value);
        await tx.wait(1);
        console.log(tx);
        setChanged((current) => !current); // toggle boolean to force a re-render on TokenOverview
    };

    return (
        <>
            <h2 className={styles.title}>Add Child</h2>
            <div className={styles.createTokenPanel}>
                <div className={styles.createContainer}>
                    <form onSubmit={addChild}>
                        <div className={styles.formContainer}>
                            <label>Name</label>
                            <input type="text" ref={childNameRef}></input>
                            <label>Child Address</label>
                            <input type="text" ref={childAddressRef}></input>
                            <label>Token Preference</label>
                            <select name="languages" id="lang" ref={tokenPreferenceRef}>
                                {tokens &&
                                    tokens.map((token,index) => {
                                        return (
                                            <option key={index} value={token.tokenAddress}>
                                                {token.name}
                                            </option>
                                        );
                                    })}
                            </select>
                            <label>Base Amount</label>
                            <input type="number" ref={baseAmountRef}></input>
                            <button className={styles.button}>Add</button>
                        </div>
                    </form>
                </div>
                <ChildOverview childAdded={changed}/>
            </div>
        </>
    );
};

export default AddChildPanel;
