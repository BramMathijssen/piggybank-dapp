import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./EditClaimPeriod.module.scss";

const EditClaimPeriod = () => {
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    const [changed, setChanged] = useState(false);

    const ethersCtx = useContext(EthersContext);

    const setClaimMomentDaily = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentDaily();
        await tx.wait(1);
    };

    const setClaimMomentWeekly = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentWeekly();
        await tx.wait(1);
    };

    const setClaimMomentMonthly = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentMonthly();
        await tx.wait(1);
    };

    return (
        <div className={styles.editClaimPeriod}>
            <div className={styles.claimPeriodContainer}>
                <div className={styles.claimPeriod}>
                    <div className={styles.period}>
                        <p>DAILY</p>
                    </div>
                    <div className={styles.flexContainer}>
                        <div className={styles.claimableAmount}>
                            <p>Claimable</p>
                            <p>128</p>
                        </div>
                        <button className={styles.claimPeriodButton}>Pick</button>
                    </div>
                </div>
                <div className={styles.claimPeriod}>
                    <div className={styles.period}>
                        <p>WEEKLY</p>
                    </div>
                    <div className={styles.flexContainer}>
                        <div className={styles.claimableAmount}>
                            <p>Claimable</p>
                            <p>1000</p>
                        </div>
                        <button className={styles.claimPeriodButton}>Pick</button>
                    </div>
                </div>
                <div className={styles.claimPeriod}>
                    <div className={styles.period}>
                        <p>MONTHLY</p>
                    </div>
                    <div className={styles.flexContainer}>
                        <div className={styles.claimableAmount}>
                            <p>Claimable</p>
                            <p>4400</p>
                        </div>
                        <button className={styles.claimPeriodButton}>Pick</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditClaimPeriod;
