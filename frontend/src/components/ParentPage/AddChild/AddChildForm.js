import React, { useContext, useRef, useState } from "react";
import ChildContext from "../../../context/child-context";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";
import Button from "../../UI/Button";
import Dropdown from "../../UI/Dropdown";
import Input from "../../UI/Input";

import styles from "./AddChildForm.module.scss";

const AddChildForm = () => {
    const childNameRef = useRef();
    const childAddressRef = useRef();
    const baseAmountRef = useRef();
    const tokenPreferenceRef = useRef();

    const [changed, setChanged] = useState(false);

    const ethersCtx = useContext(EthersContext);
    // const tokenCtx = useContext(TokenContext);
    const tokens = useEvent("TokenCreated", changed, ethersCtx.userAddress);
    const childCtx = useContext(ChildContext);

    // console.log(tokens);
    // console.log(tokenCtx.tokens);

    const addChildHandler = async (e) => {
        e.preventDefault();
        console.log(`Adding new child`);
        const tx = await ethersCtx.contract.addChild(childNameRef.current.value, childAddressRef.current.value, tokenPreferenceRef.current.value, baseAmountRef.current.value);
        
        await tx.wait(1);
        childCtx.setChildAdded((current) => !current); // toggle boolean to force a re-render on ChildOverview
        // console.log(tx);
        // setChanged((current) => !current); 
    };

    return (
        <div className={styles.addChildForm}>
            <form className={styles.form} onSubmit={addChildHandler}>
                <Input label="Name" content="Name" inputRef={childNameRef} />
                <Input label="Child Address" content="Address" inputRef={childAddressRef} />
                <Dropdown label="Token Preference" options={tokens} optionValue="tokenAddress" optionDisplay="name" inputRef={tokenPreferenceRef} />
                <Input label="Base Amount" content="Amount" inputRef={baseAmountRef} />
                <div className={styles.buttonContainer}>
                    <Button content="add" size="medium" />
                </div>
            </form>
        </div>
    );
};

export default AddChildForm;
