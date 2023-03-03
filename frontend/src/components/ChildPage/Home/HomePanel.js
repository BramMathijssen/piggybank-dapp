import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import Timer from "../CountdownTimer";
import styles from "./HomePanel.module.scss";

const HomePanel = () => {
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
            const leftTime = claimTx.nextClaimPeriod.toNumber() - currentTime.toNumber();
            setTimeLeft(leftTime);
        };
        getMyParentAndClaim();
    }, [ethersCtx]);

    useEffect(() => {
        const getMyParentAndClaim = async () => {
            if (!ethersCtx.contract) return;

            const currentTime = await ethersCtx.contract.getCurrentTime();
            console.log(`✅Current Time: ${currentTime}`);
        };
        getMyParentAndClaim();
    }, [ethersCtx]);

    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // multiply by 1000 to convert from seconds to milliseconds
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    };

    const claim = async () => {
        const claimTx = await ethersCtx.contract.claim(myClaim.tokenPreference, myClaim.tokenPreference);
    };

    console.log(myClaim);

    return (
        <>
            {timeLeft ? <Timer timeLeft={timeLeft} /> : null}
            <h2 className={styles.title}>Panel Content</h2>
            <div className={styles.rowContainer}>
                {myClaim && (
                    <>
                        <p>Yooo {myClaim.name}</p>
                        <p>Your Parent is: {parentAddress}</p>
                        <p>Your token preference is: {myClaim.tokenPreference} </p>
                        <p>Your Claimable amount is {myClaim.claimableAmount.toString()}</p>
                        <p>Your next Claim date is: {convertTimestampToDate(myClaim.nextClaimPeriod.toString())}</p>
                        <p>My Claim Period: {getClaimPeriodString(myClaim.claimPeriod)}</p>
                    </>
                )}
                <div className={styles.myParentContainer}></div>
                <div className={styles.myClaims}></div>
                {timeLeft < 0 ? <button onClick={claim}>Claim</button> : null}
            </div>
        </>
    );
};

export default HomePanel;
