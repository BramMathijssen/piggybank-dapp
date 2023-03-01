import React, { useContext, useRef, useState, useEffect } from "react";
import networksMapping from "../../../constants/networksMapping";

import styles from "./AddChildPanel.module.scss";
import EthersContext from "../../../context/ethers-context";

const AddChildPanel = () => {
    const childNameRef = useRef();
    const childAddressRef = useRef();
    const baseAmountRef = useRef();
    const tokenPreferenceRef = useRef();

    const [changed, setChanged] = useState(false);
    const [tokens, setTokens] = useState();

    const ethersCtx = useContext(EthersContext);

    const addChild = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.addChild(childNameRef.current.value, childAddressRef.current.value, tokenPreferenceRef.current.value, baseAmountRef.current.value);
        await tx.wait(1);
        setChanged((current) => !current); // toggle boolean to force a re-render on TokenOverview
    };

    useEffect(() => {
        console.log(`finding all tokens`);
        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.TokenCreated(ethersCtx.userAddress, null, null);
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            const tokenList = [];

            for (let i = 0; i < events.length; i++) {
                const { name } = events[i].args[2];
                const obj = { tokenName: name };
                tokenList.push(obj);
            }

            setTokens(tokenList);
        };
        getEvents();
    }, []);

    console.log(tokens);

    // unction addChild(string memory _name, address _childAddress, address _tokenPreference, uint256 _baseAmount)
    return (
        <>
            <h2 className={styles.title}>Add Child</h2>
            <div className={styles.AddChildPanel}>
                <div className={styles.AddChildPanel}>
                    <form onSubmit={addChild}>
                        <div className={styles.formContainer}>
                            <label>Name</label>
                            <input type="text" ref={childNameRef}></input>
                            <label>Child Address</label>
                            <input type="text" ref={childAddressRef}></input>
                            <label>Token Preference</label>
                            <select name="languages" id="lang" ref={tokenPreferenceRef}>
                                {tokens && tokens.map(token => {
                                    return <option key={Math.random()} value={token.tokenName}>{token.tokenName}</option>
                                })}
                            </select>
                            <label>Base Amount</label>
                            <input type="number" ref={baseAmountRef}></input>
                            <button className={styles.button}> deploy</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddChildPanel;
