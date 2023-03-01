import { poll } from "ethers/lib/utils";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./ChildOverview.module.scss";

const ChildOverview = ({ tokenAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const [children, setChildren] = useState([{}]);

    useEffect(() => {
        console.log(`running useEffect`);
        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.ChildAdded();
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            console.log(events);

            const childList = [];

            for (let i = 0; i < events.length; i++) {
                const { name, childAddress, claimPeriod, nextClaimPeriod, baseAmount, claimableAmount, tokenPreference } = events[i].args[2];
                const obj = { childName: name, childAddress: childAddress, claimPeriod: claimPeriod, nextClaimPeriod: nextClaimPeriod, baseAmount: baseAmount, claimableAmount: claimableAmount, tokenPreference: tokenPreference };
                childList.push(obj);
            }

            setChildren(childList);
        };
        getEvents();
    }, [tokenAdded]);

    return (
        <div className={styles.overviewContainer}>
            <p>Children</p>
            <ul>
                {children &&
                    children.map((child) => {
                        return (
                            <li>
                                {child.childName} {child.tokenPreference}{" "}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default ChildOverview;
