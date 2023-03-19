import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { motion } from "framer-motion";

import styles from "./User.module.scss";

const User = ({ type }) => {
    return (
        <motion.div
            className={styles.container}
            whileHover={{
                scale: 1.1,
                border: "5px solid #00FFC3",
            }}
            transition={{ type: "spring" }}
        >
            <div className={styles.title}>{type}</div>
            <div className={styles.content}>
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
        </motion.div>
    );
};

export default User;
