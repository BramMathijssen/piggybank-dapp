import React, { useState } from "react";
import HomePanel from "../components/ChildPage/Home/HomePanel";
import Sidebar from "../components/UI/Sidebar";

import styles from "./Child.module.scss";
import ConnectWallet from "../components/ParentPage/Layout/ConnectWallet";
import EditClaimPanel from "../components/ChildPage/EditClaim/EditClaimPanel";
import HomePanelNew from "../components/ChildPage/Home/HomePanelNew";

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
                {home ? <HomePanelNew /> : null}
                {editClaim ? <EditClaimPanel /> : null}
            </div>
        </main>
    );
};

export default Child;
