import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import useCountdown from "../../../hooks/useCountdown";
import Button from "../../UI/Button";
import CountdownTimer from "../CountdownTimer";

import styles from "./ClaimCountdown.module.scss";

const ClaimCountdown = ({ child }) => {
    // const [parentAddress, setParentAddress] = useState();
    // const [child, setChild] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const ethersCtx = useContext(EthersContext);

    // useEffect(() => {
    //     const initialiseChildData = async () => {
    //         if (!ethersCtx.contract) return;

    //         // get the child's parent address
    //         const tempParentAddress = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
    //         setParentAddress(tempParentAddress);

    //         // gets the child's data 
    //         const tempChild = await ethersCtx.contract.parentToChildMappingNested(tempParentAddress, ethersCtx?.userAddress);
    //         setChild(tempChild);

    //         // get the current time of the contract in UNIX
    //         const currentTime = await ethersCtx.contract.getCurrentTime();

    //         // calculate the time left untill the child is able to claim their allowance
    //         const tempTimeLeft = tempChild.nextClaimPeriod.toNumber() - currentTime.toNumber();
    //         setTimeLeft(tempTimeLeft);
    //     };
    //     initialiseChildData();
    // }, [ethersCtx]);

        useEffect(() => {
        const getTimeLeft = async () => {
            // get the current time of the contract in UNIX
            const currentTime = await ethersCtx.contract.getCurrentTime();

            // calculate the time left untill the child is able to claim their allowance
            const tempTimeLeft = child.nextClaimPeriod.toNumber() - currentTime.toNumber();
            setTimeLeft(tempTimeLeft);
        };
        getTimeLeft();
    }, [ethersCtx,child]);

    console.log('hey')

    const claim = async () => {
        const claimTx = await ethersCtx.contract.claim(child.tokenPreference, child.tokenPreference);
    };

    console.log(child);

    return (
        <div className={styles.claimCountdown}>
            <div className={styles.countDown}>{timeLeft ? <CountdownTimer timeLeft={timeLeft} claimPeriod={child.claimPeriod} /> : null}</div>
            <div className={styles.claimButton}>{timeLeft < 0 ? <Button onClick={claim} size="medium" content="claim"></Button> : null}</div>
        </div>
    );
};

export default ClaimCountdown;
