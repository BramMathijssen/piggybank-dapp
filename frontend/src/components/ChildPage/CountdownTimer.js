import React, { useState, useEffect } from "react";

const CountdownTimer = ({ timeLeft }) => {
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
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div>
            <h2>{`${formatTime(days)}:${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</h2>
        </div>
    );
};

export default CountdownTimer;
