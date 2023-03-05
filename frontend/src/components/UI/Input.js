import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

const Input = forwardRef(({ type, label, size, content, inputRef}) => {
    return (
        <>
            <label className={styles.label}>{label}</label>
            <input className={`${styles["input"]} ${styles[type]} ${styles[size]}`} ref={inputRef} placeholder={content}></input>
        </>
    );
});

export default Input;
