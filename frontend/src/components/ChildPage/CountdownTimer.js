import React, { useState, useEffect } from "react";

import styles from "./CountdownTimer.module.scss";
import ProgressBar from "./ProgressBar";

const CountdownTimer = ({ timeLeft, claimPeriod }) => {
    const [timeRemaining, setTimeRemaining] = useState(timeLeft);
    const days = Math.floor(timeRemaining / (24 * 60 * 60));
    const hours = Math.floor((timeRemaining / (60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const seconds = Math.floor(timeRemaining % 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (time) => {
        return time <= 0 ? "00 " : time < 10 ? `0${time}` : time;
    };

    return (
        <>
            <div className={styles.gridContainer}>
                <p className={styles.countdown}>{formatTime(days)}</p>
                <p className={styles.countdown}>{formatTime(hours)}</p>
                <p className={styles.countdown}>{formatTime(minutes)}</p>
                <p className={styles.countdown}>{formatTime(seconds)}</p>
                <p className={styles.timeUnit}>Days</p>
                <p className={styles.timeUnit}>Hours</p>
                <p className={styles.timeUnit}>Minutes</p>
                <p className={styles.timeUnit}>Seconds</p>
            </div>
            <div className={styles.progressContainer}>
                <ProgressBar timeRemaining={timeRemaining} claimPeriod={claimPeriod}/>
            </div>
        </>
    );
};

export default CountdownTimer;
