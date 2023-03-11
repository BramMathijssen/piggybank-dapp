import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../../helpers/unixToDate";
import Timer from "../CountdownTimer";

import styles from "./Details.module.scss";

const Details = () => {
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();
    const [claimDate, setClaimDate] = useState();
    const ethersCtx = useContext(EthersContext);

    useEffect(() => {
        const getMyParentAndClaim = async () => {
            if (!ethersCtx.contract) return;

            const parentTx = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
            setParentAddress(parentTx);

            const claimTx = await ethersCtx.contract.parentToChildMappingNested(parentTx, ethersCtx?.userAddress);
            setMyClaim(claimTx);

            const { formattedDate, formattedTime } = unixTimestampToReadable(claimTx.nextClaimPeriod.toString());
            setClaimDate(formattedDate);
        };
        getMyParentAndClaim();
    }, [ethersCtx]);

    return (
        <div className={styles.detailsContainer}>
            {myClaim && (
                <>
                    <div className={styles.welcome}>
                        <p className={styles.intro}>Welcome</p>
                        <p className={styles.name}>{myClaim.name}</p>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.info}>Parent Address:</p>
                        <p className={styles.result}>{parentAddress}</p>
                        <p className={styles.info}>Token preference:</p>
                        <p className={styles.result}>{myClaim.tokenPreference} </p>
                        <p className={styles.info}>Claimable amount:</p>
                        <p className={styles.result}>{myClaim.claimableAmount.toString()}</p>
                        <p className={styles.info}>Next Claim date:</p>
                        <p className={styles.result}>{claimDate}</p>
                        <p className={styles.info}>Claim Period:</p>
                        <p className={styles.result}>{getClaimPeriodString(myClaim.claimPeriod)}</p>
                    </div>
                </>
            )}
            <div className={styles.myParentContainer}></div>
            <div className={styles.myClaims}></div>
        </div>
    );
};

export default Details;
