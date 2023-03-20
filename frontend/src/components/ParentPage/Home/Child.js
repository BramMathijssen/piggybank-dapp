import React from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { truncateAddress } from "../../../helpers/truncateAddress";

import styles from "./Child.module.scss";

const Child = ({ name, address }) => {
    return (
        <div className={styles.child}>
            <div className={styles.avatar}>
                <Jazzicon diameter={44} seed={jsNumberForAddress(address)} />
            </div>
            <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                <p className={styles.address}>{truncateAddress(address)}</p>
            </div>
        </div>
    );
};

export default Child;
