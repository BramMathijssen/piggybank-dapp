import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";


import styles from "./User.module.scss";

const User = ({ type }) => {
    return (
        <div  className={styles.container}>
            <div className={styles.title}>{type}</div>
            <div className={styles.content}>
                <p>Hey im content</p>
            </div>
            <div className={styles.action}>
                {type === "Parent" ? (
                    <Link to="/parent">
                        <Button type="confirm" size="medium" content="Start" />
                    </Link>
                ) : (
                    <Link to="/child">
                        <Button type="confirm" size="medium" content="Start" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default User;
