import React, { useContext, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ClaimPeriod from "./ClaimPeriod";

import styles from "./EditClaimPeriod.module.scss";

const EditClaimPeriod = ({ child, setChanged }) => {
    const [claimableDaily, setClaimableDaily] = useState();
    const [claimableWeekly, setClaimableWeekly] = useState();
    const [claimableMonthly, setClaimableMonthly] = useState();

    const [dailyActive, setDailyActive] = useState(false);
    const [weeklyActive, setWeeklyActive] = useState(true);
    const [monthlyActive, setMonthlyActive] = useState(false);

    const ethersCtx = useContext(EthersContext);

    const getClaimableAmount = async (claimPeriod) => {
        const claimableAmount = await ethersCtx.contract.calculateClaimableAmount(child.baseAmount, claimPeriod);

        return claimableAmount;
    };

    // get the claimable amount based on the claimPeriod
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

    // gets the current active claimPeriod to dynamically style the claimperiod component
    useEffect(() => {
        if (child.claimPeriod === 0) {
            setDailyActive(true);
            setWeeklyActive(false);
            setMonthlyActive(false);
        } else if (child.claimPeriod === 1) {
            setDailyActive(false);
            setWeeklyActive(true);
            setMonthlyActive(false);
        } else if (child.claimPeriod === 2) {
            setDailyActive(false);
            setWeeklyActive(false);
            setMonthlyActive(true);
        }
    }, [child]);

    const setClaimPeriodDaily = async () => {
        try {
            ethersCtx.setLoading(true);
            const tx = await ethersCtx.contract.setChildClaimMomentDaily();
            await tx.wait(1);
            ethersCtx.setLoading(false);
            setChanged((prev) => !prev); // toggles boolean to force a re-render
        } catch (error) {
            console.log(`something went wrong with your transaction.${error}`);
            ethersCtx.setLoading(false);
        }
    };

    const setClaimPeriodWeekly = async () => {
        try {
            ethersCtx.setLoading(true);
            const tx = await ethersCtx.contract.setChildClaimMomentWeekly();
            await tx.wait(1);
            ethersCtx.setLoading(false);
            setChanged((prev) => !prev); // toggles boolean to force a re-render
        } catch (error) {
            console.log(`something went wrong with your transaction.${error}`);
            ethersCtx.setLoading(false);
        }
    };

    const setClaimPeriodMonthly = async () => {
        try {
            ethersCtx.setLoading(true);
            const tx = await ethersCtx.contract.setChildClaimMomentMonthly();
            await tx.wait(1);
            ethersCtx.setLoading(false);
            setChanged((prev) => !prev); // toggles boolean to force a re-render
        } catch (error) {
            console.log(`something went wrong with your transaction.${error}`);
            ethersCtx.setLoading(false);
        }
    };

    return (
        <div className={styles.editClaimPeriod}>
            {ethersCtx.loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles.claimPeriodContainer}>
                    <ClaimPeriod type="Daily" setClaimPeriod={setClaimPeriodDaily} claimableAmount={claimableDaily} active={dailyActive} />
                    <ClaimPeriod type="Weekly" setClaimPeriod={setClaimPeriodWeekly} claimableAmount={claimableWeekly} active={weeklyActive} />
                    <ClaimPeriod type="Monthly" setClaimPeriod={setClaimPeriodMonthly} claimableAmount={claimableMonthly} active={monthlyActive} />
                </div>
            )}
        </div>
    );
};
export default EditClaimPeriod;
