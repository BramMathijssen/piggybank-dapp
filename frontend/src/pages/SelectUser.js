import React from "react";
import User from "../components/SelectUserPage/User";
import { motion } from "framer-motion";

import styles from "../pages/SelectUser.module.scss";

//
const SelectUser = () => {
    return (
        <main className={styles.main}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Pick Your Side</div>
            </div>
            <div className={styles.userContainer}>
                <motion.div
                    initial={{ y: "100vh" }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ type: "spring" }}
                >
                    <User type="Parent" />
                </motion.div>

                <motion.div initial={{ y: "-100vh" }} animate={{ x: 0, y: 0 }} transition={{ type: "spring" }}>
                    <User type="Child" />
                </motion.div>
            </div>
        </main>
    );
};

export default SelectUser;
