import { ethers } from "ethers";
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

    const ethersCtx = useContext(EthersContext);
    const childCtx = useContext(ChildContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    const addChildHandler = async (e) => {
        e.preventDefault();
        try {
            ethersCtx.setLoading(true);

            const etherValue = parseFloat(baseAmountRef.current.value);
            const weiValue = ethers.utils.parseEther(etherValue.toString());

            const tx = await ethersCtx.contract.addChild(childNameRef.current.value, childAddressRef.current.value, tokenPreferenceRef.current.value, weiValue);
            await tx.wait(1);

            ethersCtx.setLoading(false);
            childCtx.setChildAdded((current) => !current); // toggle boolean to force a re-render on ChildOverview
        } catch (error) {
            console.log(`something went wrong with your transaction.${error}`);
            ethersCtx.setLoading(false);
        }
    };

    return (
        <div className={styles.addChildForm}>
            <form className={styles.form} onSubmit={addChildHandler}>
                <Input label="Name" content="Name" inputRef={childNameRef} />
                <Input label="Child Address" content="Address" inputRef={childAddressRef} />
                <Dropdown label="Token Preference" options={tokens} optionValue="tokenAddress" optionDisplay="name" inputRef={tokenPreferenceRef} />
                <Input label="Base Amount (in ETH)" content="Amount" inputRef={baseAmountRef} />
                <div className={styles.buttonContainer}>
                    <Button content="add" size="medium" />
                </div>
            </form>
        </div>
    );
};

export default AddChildForm;
