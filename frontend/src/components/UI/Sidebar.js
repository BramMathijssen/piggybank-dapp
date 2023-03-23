import React from "react";
import Avatar from "./Avatar";
import { motion } from "framer-motion";

import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ links }) => {
    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <Avatar />
            </div>
            <nav className={styles.navigation}>
                <ul className={styles.ul}>
                    {links.map((link, index) => (
                        <motion.li
                            className={styles.li}
                            key={index}
                            whileHover={{
                                scale: 1.03,
                                originX: 0,
                            }}
                            transition={{ type: "tween" }}
                        >
                            <a className={styles.link} onClick={link.onClick}>
                                {link.label}
                            </a>
                        </motion.li>
                    ))}
                    <Link to="../select-user">
                        <li className={styles.li}>
                            <a className={styles.link}>Log-out</a>
                        </li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
