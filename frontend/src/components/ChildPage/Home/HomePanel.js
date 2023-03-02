import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import Timer from "../CountdownTimer";

import styles from "./HomePanel.module.scss";

const HomePanel = () => {
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [nextClaimMoment, setNextClaimMoment] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const ethersCtx = useContext(EthersContext);

    useEffect(() => {
        const getMyParent = async () => {
            const tx = await ethersCtx?.contract.childToParentMapping(ethersCtx.userAddress);

            setParentAddress(tx);
            console.log(tx);
        };
        ethersCtx.contract && getMyParent();
    }, [ethersCtx]);

    useEffect(() => {
        const getMyClaim = async () => {
            const tx = await ethersCtx?.contract.parentToChildMappingNested(parentAddress, ethersCtx?.userAddress);
            console.log(tx);
            setMyClaim(tx);
            const { nextClaimPeriod } = tx;
            setNextClaimMoment(nextClaimPeriod.toNumber());
            console.log(nextClaimPeriod.toString());
        };
        ethersCtx.contract && getMyClaim();
    }, [ethersCtx, parentAddress]);

    useEffect(() => {
        const getCurrentTime = async () => {
            const tx = await ethersCtx?.contract.getCurrentTime();
            console.log(tx.toNumber());
            setCurrentTime(tx.toString());
        };
        ethersCtx.contract && getCurrentTime();
    }, [ethersCtx, parentAddress]);

    useEffect(() => {
        const leftTime = nextClaimMoment - currentTime;

        console.log(`------time left--------`);
        console.log(` ❓ Current time is: ${currentTime}`);
        console.log(`✅ NextClaim Moment: ${nextClaimMoment} - Current Time: ${currentTime} = ${timeLeft}`);
        console.log(timeLeft);

        setTimeLeft(leftTime);
    }, [currentTime, nextClaimMoment, timeLeft]);

    console.log(parentAddress);
    console.log(myClaim);

    return (
        <>
            {timeLeft ? <Timer timeLeft={timeLeft} /> : null}
            <h2 className={styles.title}>Panel Content</h2>
            <div className={styles.rowContainer}>
                <p>Yooo</p>
                <div className={styles.myParentContainer}></div>
                <div className={styles.myClaims}></div>
                {/* <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row /> */}
            </div>
        </>
    );
};

export default HomePanel;
