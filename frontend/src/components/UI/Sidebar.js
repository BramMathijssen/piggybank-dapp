import React from "react";
import Avatar from "./Avatar";
import { motion } from "framer-motion";

import styles from "./Sidebar.module.scss";

const Sidebar = ({ links }) => {
    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <Avatar />
            </div>
            <nav>
                <ul className={styles.ul}>
                    {links.map((link, index) => (
                        <motion.li
                            className={styles.li}
                            key={index}
                            whileHover={{
                                scale: 1.03,
                                originX: 0,
                            }}
                            transition={{ type: "tween"}}
                        >
                            <a className={styles.link} onClick={link.onClick}>
                                {link.label}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
