import React from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { truncateAddress } from "../../../helpers/truncateAddress";

import styles from "./Child.module.scss";

const Child = ({ name, address }) => {
    return (
        <div className={styles.child}>
            <div className={styles.childAvatar}>
                <Jazzicon diameter={50} seed={jsNumberForAddress(address)} />
            </div>
            <div className={styles.childContent}>
                <p>{name}</p>
                <p>{truncateAddress(address)}</p>
            </div>
        </div>
    );
};

export default Child;
