import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { motion } from "framer-motion";

import styles from "./User.module.scss";
import EthersContext from "../../context/ethers-context";

const User = ({ type }) => {
    const ethersCtx = useContext(EthersContext);

    return (
        <motion.div
            className={`${styles[`container`]} ${styles[type]}`}
            whileHover={{
                scale: 1.1,
            }}
            transition={{ type: "spring", stiffness: 500 }}
        >
            {/* <div className={styles.title}>{type}</div>
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
            </div> */}

            <div className={`${styles[`content`]} ${type}`}>Continue as a {type}</div>
            <div className={styles.action}>
                {type === "Parent" ? (
                    <Link to="/parent">
                        <Button onClick={ethersCtx.onConnect} type="confirm" size="medium" content="Start" />
                    </Link>
                ) : (
                    <Link to="/child">
                        <Button onClick={ethersCtx.onConnect} type="purple" size="medium" content="Start" />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default User;
