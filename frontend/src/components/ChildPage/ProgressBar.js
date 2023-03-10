import React, { useState, useEffect } from "react";

import styles from "./ProgressBar.module.scss";

const ProgressBar = () => {


    return (
        <div className={styles.progressBar}>
            <div className={styles.inner}></div>
        </div>
    );
};

export default ProgressBar;
