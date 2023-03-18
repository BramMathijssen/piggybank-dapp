import React from "react";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../../helpers/unixToDate";
import { weiToEth } from "../../../helpers/weiToEth";

import styles from "./Details.module.scss";

const Details = ({ parentAddress, child }) => {
    return (
        <div className={styles.detailsContainer}>
            {child && (
                <>
                    <div className={styles.welcome}>
                        <p className={styles.intro}>Welcome</p>
                        <p className={styles.name}>{child.name}</p>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.info}>Parent Address:</p>
                        <p className={styles.result}>{parentAddress}</p>
                        <p className={styles.info}>Token preference:</p>
                        <p className={styles.result}>{child.tokenPreference} </p>
                        <p className={styles.info}>Claimable amount:</p>
                        <p className={styles.result}>{weiToEth(child.claimableAmount.toString())}</p>
                        <p className={styles.info}>Next Claim date:</p>
                        <p className={styles.result}>{unixTimestampToReadable(child.nextClaimPeriod.toString()).formattedDate}</p>
                        <p className={styles.info}>Claim Period:</p>
                        <p className={styles.result}>{getClaimPeriodString(child.claimPeriod)}</p>
                    </div>
                </>
            )}
            <div className={styles.myParentContainer}></div>
            <div className={styles.myClaims}></div>
        </div>
    );
};

export default Details;
