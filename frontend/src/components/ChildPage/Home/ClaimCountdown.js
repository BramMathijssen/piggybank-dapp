import React, { useContext, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import Button from "../../UI/Button";
import CountdownTimer from "./CountdownTimer";

import styles from "./ClaimCountdown.module.scss";

const ClaimCountdown = ({ child, setClaimed, claimed }) => {
    const [timeLeft, setTimeLeft] = useState();
    const ethersCtx = useContext(EthersContext);

    useEffect(() => {
        const getTimeLeft = async () => {
            // get the current time of the contract in UNIX
            const currentTime = await ethersCtx.contract.getCurrentTime();

            // calculate the time left untill the child is able to claim their allowance
            const tempTimeLeft = child.nextClaimPeriod.toNumber() - currentTime.toNumber();
            setTimeLeft(tempTimeLeft);
        };
        getTimeLeft();
    }, [ethersCtx, child, claimed]);

    const claimHandler = async (e) => {
        e.preventDefault();
        console.log(`claiming..`);
        const claimTx = await ethersCtx.contract.claim(child.tokenPreference, child.tokenPreference);
        await claimTx.wait(1);
        setClaimed((current) => !current); // toggle boolean to force a re-render on transactions/tokenoverview/details
    };

    return (
        <div className={styles.claimCountdown}>
            <div className={styles.countDown}>{timeLeft ? <CountdownTimer timeLeft={timeLeft} claimPeriod={child.claimPeriod} /> : null}</div>
            <div className={styles.claimButton}>{timeLeft < 0 ? <Button onClick={claimHandler} size="medium" content="claim"></Button> : null}</div>
        </div>
    );
};

export default ClaimCountdown;
