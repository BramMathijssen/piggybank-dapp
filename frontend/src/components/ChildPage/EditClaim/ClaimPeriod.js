import React from "react";
import { weiToEth } from "../../../helpers/weiToEth";

import styles from "./ClaimPeriod.module.scss";

const ClaimPeriod = ({ type, setClaimPeriod, claimableAmount, active }) => {
    const transformString = (period) => {
        if (type === "Daily") {
            return "Day";
        } else if (type === "Weekly") {
            return "Week";
        } else if (type === "Monthly") {
            return "Month";
        }
    };
    return (
        <>
            <div className={`${styles[`claimPeriod`]} ${active ? styles.active : ""}`}>
                <div className={styles.period}>
                    <p className={styles.type}>{type}</p>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.claimableAmount}>
                        <p className={styles.claimAble}>Claimable</p>
                        <div className={styles.amountFlex}>
                            <p>{weiToEth(claimableAmount)}</p>
                            <p>/{transformString(type)}</p>
                        </div>
                    </div>
                    {!active ? (
                        <button className={styles.claimPeriodButton} onClick={setClaimPeriod}>
                            Pick
                        </button>
                    ) : (
                        <p className={styles.selected}>Current</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ClaimPeriod;
