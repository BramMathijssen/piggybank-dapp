import { poll } from "ethers/lib/utils";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./ChildOverview.module.scss";

const ChildOverview = ({ childAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const children = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);

    return (
        <div className={styles.overview}>
            {/* <ul>
                {children &&
                    children.map((child, index) => {
                        return (
                            <li key={index}>
                                {child.name} {child.tokenPreference}{" "}
                            </li>
                        );
                    })}
            </ul> */}
        </div>
    );
};

export default ChildOverview;
