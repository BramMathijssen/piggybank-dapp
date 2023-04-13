import React, { useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import ConnectWallet from "../components/UI/ConnectWallet";
import EditClaimPanel from "../components/ChildPage/EditClaim/EditClaimPanel";
import HomePanel from "../components/ChildPage/Home/HomePanel";

import styles from "./Child.module.scss";

const Child = () => {
    const [home, setHome] = useState(true);
    const [editClaim, setEditClaim] = useState(false);

    const setHomePanel = () => {
        setHome(true);
        setEditClaim(false);
    };

    const setEditClaimPanel = () => {
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
                {home ? <HomePanel /> : null}
                {editClaim ? <EditClaimPanel /> : null}
            </div>
        </main>
    );
};

export default Child;
