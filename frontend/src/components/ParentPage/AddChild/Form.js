import React, { useContext, useRef, useState, useEffect, createRef } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";
import Dropdown from "../../UI/Dropdown";
import Input from "../../UI/Input";

import styles from "./Form.module.scss";

const Form = ({ childAdded }) => {
    const childNameRef = useRef();
    const childAddressRef = useRef();
    const baseAmountRef = useRef();
    const tokenPreferenceRef = useRef();

    // const childNameRef = createRef();
    // const childAddressRef = createRef();
    // const baseAmountRef = createRef();
    // const tokenPreferenceRef = createRef();

    const [changed, setChanged] = useState(false);

    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", changed, ethersCtx.userAddress);

    const addChild = async (e) => {
        e.preventDefault();
        console.log(`Adding new child`);
        //console.log(childAddressRef.current.value);
        const tx = await ethersCtx.contract.addChild(childNameRef.current.value, childAddressRef.current.value, tokenPreferenceRef.current.value, baseAmountRef.current.value);
        await tx.wait(1);
        console.log(tx);
        setChanged((current) => !current); // toggle boolean to force a re-render on TokenOverview
    };

    return (
        <div className={styles.form}>
            <form className={styles.form2} onSubmit={addChild}>
                <Input label="Name" content="Name" inputRef={childNameRef} />
                <Input label="Child Address" content="Address" inputRef={childAddressRef} />
                <Dropdown label="Token Preference" options={tokens} optionValue="tokenAddress" optionDisplay="name" inputRef={tokenPreferenceRef} />
                <Input label="Base Amount" content="Amount" inputRef={baseAmountRef} />

                {/* <label>Name</label>
                <input type="text" ref={childNameRef}></input>
                <label>Child Address</label>
                <input type="text" ref={childAddressRef}></input>
                <label>Token Preference</label>
                <select name="languages" id="lang" ref={tokenPreferenceRef}>
                    {tokens &&
                        tokens.map((token, index) => {
                            return (
                                <option key={index} value={token.tokenAddress}>
                                    {token.name}
                                </option>
                            );
                        })}
                </select>
                <label>Base Amount</label>
                <input type="number" ref={baseAmountRef}></input> */}
                <button className={styles.button}>Add</button>
            </form>
        </div>
    );
};

export default Form;
