import React from "react";
import { weiToEth } from "../../../helpers/weiToEth";
import { motion } from "framer-motion";

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
        <motion.div
            className={`${styles[`claimPeriod`]} ${active ? styles.active : ""}`}
            layout
            whileHover={{
                scale: 1.03,
                originX: 0,
                border: "2px solid black",
            }}
            transition={{ type: "spring", stiffness: 500 }}
        >
            <div className={styles.period}>
                <p className={styles.type}>{type}</p>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.claimableAmount}>
                    <p className={styles.claimable}>Claimable</p>
                    <div className={styles.amountFlex}>
                        <p className={styles.claimableAmount}>{weiToEth(claimableAmount)}</p>
                        <p className={styles.claimMoment}>/{transformString(type)}</p>
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
        </motion.div>
    );
};

export default ClaimPeriod;
