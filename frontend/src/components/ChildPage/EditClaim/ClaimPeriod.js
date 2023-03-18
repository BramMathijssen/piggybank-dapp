import React from "react";

import styles from "./ClaimPeriod.module.scss";

const ClaimPeriod = ({ type, setClaimPeriod, claimableAmount, active }) => {
    return (
        <>
            <div className={`${styles[`claimPeriod`]} ${active ? styles.active : ""}`}>
                <div className={styles.period}>
                    <p className={styles.type}>{type}</p>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.claimableAmount}>
                        <p>Claimable</p>
                        <p>{claimableAmount}</p>
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
