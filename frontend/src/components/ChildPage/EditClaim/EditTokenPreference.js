import React, { useContext, useRef, useState, useEffect } from "react";

import styles from "./EditTokenPreference.module.scss";
import EthersContext from "../../../context/ethers-context";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { useEvent } from "../../../hooks/useEvent";

const EditTokenPreference = ({ child }) => {
    return (
        <div className={styles.tokenPreference}>
            <h3>Currently Selected Token</h3>
            <div className={styles.currentToken}>
                <div className={styles.tokenInfo}>
                    <div className={styles.tokenAvatar}>
                        <Jazzicon diameter={45} seed={jsNumberForAddress(child.tokenPreference)} />
                    </div>
                    <div className={styles.tokenDetails}>
                        <p>Token Name</p>
                        <p>0x98453948fhsdkfj29383fsdjkfl45dfgdfg3xcvj5</p>
                    </div>
                </div>
                <div className={styles.amountOwned}>
                    <p className={styles.amount}>1000</p>
                    <p className={styles.tokenSymbol}>MC </p>
                </div>
            </div>
            <p>Token preference</p>
        </div>
    );
};

export default EditTokenPreference;
