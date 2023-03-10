import React, { useState, useEffect } from "react";

import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ timeRemaining, claimPeriod }) => {
    const [percentage, setPercentage] = useState();
    const DAY_UNIX = 86400;
    const WEEK_UNIX = 604800;
    const MONTH_UNIX = 2419200;


    const calcPercentage = (claimPeriod) => {
        let percentage;
        switch (claimPeriod) {
            case 0:
                percentage = 100 - (timeRemaining / DAY_UNIX) * 100;
                return percentage;
            case 1:
                percentage = 100 - (timeRemaining / WEEK_UNIX) * 100;
                return percentage;
            case 2:
                percentage = 100 - (timeRemaining / MONTH_UNIX) * 100;
                return percentage;
            default:
                console.log(`something went wrong`);
        }
    };

    useEffect(() => {
        setPercentage(calcPercentage(claimPeriod));
    }, []);

    const progressBarStyle = {
        width: `${percentage}%`,
    };

    return (
        <div className={styles.progressBar}>
            <div className={styles.inner} style={progressBarStyle}>
                <p>{timeRemaining}</p>
            </div>
        </div>
    );
};

export default ProgressBar;
