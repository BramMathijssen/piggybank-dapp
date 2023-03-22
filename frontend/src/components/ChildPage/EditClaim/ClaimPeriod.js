import React, { useContext } from "react";
import { weiToEth } from "../../../helpers/weiToEth";
import { motion } from "framer-motion";

import styles from "./ClaimPeriod.module.scss";
import EthersContext from "../../../context/ethers-context";
import LoadingSpinner from "../../UI/LoadingSpinner";

const ClaimPeriod = ({ type, setClaimPeriod, claimableAmount, active }) => {
    const ethersCtx = useContext(EthersContext);

    const transformString = (period) => {
        if (period === "Daily") {
            return "Day";
        } else if (period === "Weekly") {
            return "Week";
        } else if (period === "Monthly") {
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
            {ethersCtx.loading ? (
                <LoadingSpinner />
            ) : (
                <>
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
                </>
            )}
        </motion.div>
    );
};

export default ClaimPeriod;
