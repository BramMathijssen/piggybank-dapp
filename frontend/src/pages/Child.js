import React, { useState } from "react";
import Sidebar from "../components/UI/Sidebar";

import styles from "./Child.module.scss";
import ConnectWallet from "../components/ParentPage/Layout/ConnectWallet";
import EditClaimPanel from "../components/ChildPage/EditClaim/EditClaimPanel";
import HomePanel from "../components/ChildPage/Home/HomePanel";
import { motion } from "framer-motion";
import Panels from "../components/ChildPage/Home/TestFlex/Panels";

const Child = () => {
    const [home, setHome] = useState(true);
    const [editClaim, setEditClaim] = useState(false);

    const setHomePanel = () => {
        console.log(`setting home panel `);
        setHome(true);
        setEditClaim(false);
    };

    const setEditClaimPanel = () => {
        console.log(`setting add child panel `);
        setHome(false);
        setEditClaim(true);
    };

    // Define the links
    const childLinks = [
        { label: "Home", onClick: () => setHomePanel() },
        { label: "Edit Claim", onClick: () => setEditClaimPanel() },
    ];

    return (
        <main className={styles.main}>
            <Sidebar links={childLinks} />
            <div className={styles.content}>
                <ConnectWallet />
                <Panels />
                {/* {home ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.4 }}>
                        <HomePanel />
                    </motion.div>
                ) : null}
                {editClaim ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.4 }}>
                        <EditClaimPanel />
                    </motion.div>
                ) : null}  */}
            </div>
        </main>
    );
};

export default Child;
