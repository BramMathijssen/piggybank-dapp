import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import useCountdown from "../../../hooks/useCountdown";
import Button from "../../UI/Button";
import CountdownTimer from "../CountdownTimer";

import styles from "./ClaimCountdown.module.scss";

const ClaimCountdown = ({ childAdded }) => {
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const ethersCtx = useContext(EthersContext);

    useEffect(() => {
        const getMyParentAndClaim = async () => {
            if (!ethersCtx.contract) return;

            const parentTx = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
            setParentAddress(parentTx);

            const claimTx = await ethersCtx.contract.parentToChildMappingNested(parentTx, ethersCtx?.userAddress);
            setMyClaim(claimTx);

            const currentTime = await ethersCtx.contract.getCurrentTime();
            const timeLeftTemp = claimTx.nextClaimPeriod.toNumber() - currentTime.toNumber();
            setTimeLeft(timeLeftTemp);
        };
        getMyParentAndClaim();
    }, [ethersCtx]);

    const claim = async () => {
        const claimTx = await ethersCtx.contract.claim(myClaim.tokenPreference, myClaim.tokenPreference);
    };

    console.log(myClaim);

    return (
        <div className={styles.claimCountdown}>
            <div className={styles.countDown}>{timeLeft ? <CountdownTimer timeLeft={timeLeft} claimPeriod={myClaim.claimPeriod} /> : null}</div>
            <div className={styles.claimButton}>{timeLeft < 0 ? <Button onClick={claim} size="medium" content="claim"></Button> : null}</div>
        </div>
    );
};

export default ClaimCountdown;
