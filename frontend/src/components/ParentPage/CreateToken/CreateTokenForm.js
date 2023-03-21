import { ethers } from "ethers";
import React, { useContext, useRef } from "react";
import EthersContext from "../../../context/ethers-context";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

import styles from "./CreateTokenForm.module.scss";

const CreateTokenForm = (props) => {
    const tokenNameRef = useRef();
    const tokenSymbolRef = useRef();
    const tokenSupplyRef = useRef();

    const ethersCtx = useContext(EthersContext);

    const createTokenHandler = async (e) => {
        e.preventDefault();
        console.log(`Creating new token`);
        const etherValue = parseFloat(tokenSupplyRef.current.value);
        const weiValue = ethers.utils.parseEther(etherValue.toString());
        const tx = await ethersCtx.contract.createNewToken(weiValue, tokenNameRef.current.value, tokenSymbolRef.current.value);

        await tx.wait(1);
        props.setTokenAdded((current) => !current); // toggle boolean to force a re-render on TokenOverview
    };

    return (
        <div className={styles.createTokenForm}>
            <form className={styles.form} onSubmit={createTokenHandler}>
                <Input label="Token Name" content="Token Name" inputRef={tokenNameRef} />
                <Input label="Token Symbol" content="Token Symbol" inputRef={tokenSymbolRef} />
                <Input label="Supply (in ETH)" content="Supply (in ETH)" inputRef={tokenSupplyRef} />
                <div className={styles.buttonContainer}>
                    <Button content="Add" size="medium" />
                </div>
            </form>
        </div>
    );
};

export default CreateTokenForm;
