import React from "react";

import styles from "./ClaimPeriod.module.scss";

const ClaimPeriod = ({setClaimPeriod, claimableAmount}) => {
    return (
        <>
            <div className={styles.claimPeriod}>
                <div className={styles.period}>
                    <p>DAILY</p>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.claimableAmount}>
                        <p>Claimable</p>
                        <p>{claimableAmount}</p>
                    </div>
                    <button className={styles.claimPeriodButton} onClick={setClaimPeriod}>
                        Pick
                    </button>
                </div>
            </div>
            {/* <div className={styles.claimPeriod}>
                <div className={styles.period}>
                    <p>WEEKLY</p>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.claimableAmount}>
                        <p>Claimable</p>
                        <p>{claimableWeekly}</p>
                    </div>
                    <button className={styles.claimPeriodButton} onClick={setClaimPeriodWeekly}>
                        Pick
                    </button>
                </div>
            </div>
            <div className={styles.claimPeriod}>
                <div className={styles.period}>
                    <p>MONTHLY</p>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.claimableAmount}>
                        <p>Claimable</p>
                        <p>{claimableMonthly}</p>
                    </div>
                    <button className={styles.claimPeriodButton} onClick={setClaimPeriodMonthly}>
                        Pick
                    </button>
                </div>
            </div> */}
        </>
    );
};

export default ClaimPeriod;
