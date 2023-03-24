import React from "react";
import Avatar from "./Avatar";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";

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
                    <li className={styles.li}>
                        <a className={styles.logoutLink}>
                            <Link className={styles.reactLink} to="../select-user">
                                <ArrowLeft className={styles.linkIcon} size={21} />
                                Back
                            </Link>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
