import React from "react";
import User from "../components/SelectUserPage/User";
import Card from "../components/UI/Card";
import { motion } from "framer-motion";

import styles from "../pages/SelectUser.module.scss";

//
const SelectUser = () => {
    return (
        <main className={styles.main}>
            <div className={styles.userContainer}>
                <Card>
                    <motion.div
                        whileHover={{
                            scale: 1.1,
                            border: "5px solid green",
                        }}
                        initial={{ y: "100vh" }}
                        animate={{ x: 0, y: 0 }}
                        transition={{ type: "spring" }}
                    >
                        <User type="Parent" />
                    </motion.div>
                </Card>
                <Card>
                    <motion.div initial={{ y: "-100vh" }} animate={{ x: 0, y: 0 }} transition={{ type: "spring"}}>
                        <User type="Child" />
                    </motion.div>
                </Card>
            </div>
        </main>
    );
};

export default SelectUser;
