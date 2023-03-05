import React, { useContext, useRef, useState, useEffect } from "react";
import networksMapping from "../../../constants/networksMapping";

import styles from "./AddChildPanel.module.scss";
import EthersContext from "../../../context/ethers-context";
import ChildOverview from "./ChildOverview";
import { useEvent } from "../../../hooks/useEvent";
import Form from "./Form";
import Info from "./Info";

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
            <div className={styles.flexContainer}>
                <div className={styles.addChildContainer}>
                    <h2 className={styles.title}>Add Child</h2>
                    <Form />
                </div>
                <div className={styles.infoContainer}>
                    <h2 className={styles.title}>Info</h2>
                    <Info />
                </div>
            </div>
            <div className={styles.childOverviewContainer}>
                <ChildOverview childAdded={changed} />
            </div>
        </>
    );
};

export default AddChildPanel;
