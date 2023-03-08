import React, { forwardRef } from "react";

import styles from "./Dropdown.module.scss";

const Dropdown = forwardRef(({ label, content, options, optionValue, optionDisplay, inputRef }) => {
    return (
        <>
            <label className={styles.label}>{label}</label>
            <select className={`${styles["dropdown"]}`} ref={inputRef} placeholder={content}>
                {options.map((option, index) => (
                    <option key={index} value={option[optionValue]}>
                        {option[optionDisplay]}
                    </option>
                ))}
            </select>
        </>
    );
});

export default Dropdown;
