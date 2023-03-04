import React from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import Card from "../../UI/Card";

import styles from "./Child.module.scss";

const Child = ({ name, address }) => {
    const truncateAddress = (addy) => {
        const truncatedAddress = addy.slice(0, 3) + "..." + addy.slice(-3);

        return truncatedAddress;
    };

    return (
        <>
            {/* <Card> */}
            <div className={styles.child}>
                <div className={styles.childAvatar}>
                <Jazzicon diameter={50} seed={jsNumberForAddress(address)} />
                </div>
                <div className={styles.childContent}>
                    <p>{name}</p>
                    <p>{truncateAddress(address)}</p>
                </div>
            </div>
            {/* </Card> */}
        </>
    );
};

export default Child;
