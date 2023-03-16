import React, { useContext, useRef, useState } from "react";
import ChildContext from "../../../context/child-context";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";
import Button from "../../UI/Button";
import Dropdown from "../../UI/Dropdown";
import Input from "../../UI/Input";

import styles from "./CreateTokenForm.module.scss";

const CreateTokenForm = (props) => {
    const tokenNameRef = useRef();
    const tokenSymbolRef = useRef();
    const tokenSupplyRef = useRef();

    const [changed, setChanged] = useState(false);

    const ethersCtx = useContext(EthersContext);

    const createTokenHandler = async (e) => {
        e.preventDefault();
        console.log(`Creating new token`);
        const tx = await ethersCtx.contract.createNewToken(tokenSupplyRef.current.value, tokenNameRef.current.value, tokenSymbolRef.current.value);

        await tx.wait(1);
        props.setTokenAdded((current) => !current);
        //childCtx.setChildAdded((current) => !current); // toggle boolean to force a re-render on ChildOverview
        // console.log(tx);
        // setChanged((current) => !current);
    };

    return (
        <div className={styles.addChildForm}>
            <form className={styles.form} onSubmit={createTokenHandler}>
                <Input label="Token Name" content="Token Name" inputRef={tokenNameRef} />
                <Input label="Token Symbol" content="Token Symbol" inputRef={tokenSymbolRef} />
                <Input label="Supply" content="Supply" inputRef={tokenSupplyRef} />
                <div className={styles.buttonContainer}>
                    <Button content="add" size="medium" />
                </div>
            </form>
        </div>
    );
};

export default CreateTokenForm;
