import { ethers } from "ethers";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./EditClaimPeriod.module.scss";

const EditClaimPeriod = ({ child }) => {
    const [claimableDaily, setClaimableDaily] = useState();
    const [claimableWeekly, setClaimableWeekly] = useState();
    const [claimableMonthly, setClaimableMonthly] = useState();

    const ethersCtx = useContext(EthersContext);

    const getClaimableAmount = async (claimPeriod) => {
        console.log(`getting claimable amount`);
        const claimableAmount = await ethersCtx.contract.calculateClaimableAmount(child.baseAmount, claimPeriod);

        return claimableAmount;
    };

    useEffect(() => {
        const getClaimableAmounts = async () => {
            const tempClaimableDaily = await getClaimableAmount(0);
            setClaimableDaily(tempClaimableDaily.toString());

            const tempClaimableWeekly = await getClaimableAmount(1);
            setClaimableWeekly(tempClaimableWeekly.toString());

            const tempClaimableMonthly = await getClaimableAmount(2);
            setClaimableMonthly(tempClaimableMonthly.toString());
        };

        getClaimableAmounts();
    }, [child, ethersCtx.userAddress]);

    const setClaimPeriodDaily = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentDaily();
        await tx.wait(1);
    };

    const setClaimPeriodWeekly = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentWeekly();
        await tx.wait(1);
    };

    const setClaimPeriodMonthly = async (e) => {
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
                            <p>{claimableDaily}</p>
                        </div>
                        <button className={styles.claimPeriodButton} onClick={setClaimPeriodDaily}>Pick</button>
                    </div>
                </div>
                <div className={styles.claimPeriod}>
                    <div className={styles.period}>
                        <p>WEEKLY</p>
                    </div>
                    <div className={styles.flexContainer}>
                        <div className={styles.claimableAmount}>
                            <p>Claimable</p>
                            <p>{claimableWeekly}</p>
                        </div>
                        <button className={styles.claimPeriodButton} onClick={setClaimPeriodWeekly}>Pick</button>
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
                        <button className={styles.claimPeriodButton} onClick={setClaimPeriodMonthly}>Pick</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditClaimPeriod;
