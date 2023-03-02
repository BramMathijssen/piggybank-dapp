import React, { useState } from "react";
import HomePanel from "../components/ChildPage/Home/HomePanel";
import Sidebar from "../components/ChildPage/Sidebar";

import styles from "./Child.module.scss";
import ConnectWallet from "../components/ParentPage/Layout/ConnectWallet";

const Child = () => {
    const [home, setHome] = useState(true);
    const [addChild, setAddChild] = useState(false);
    const [createToken, setCreateToken] = useState(false);

    const setHomePanel = () => {
        console.log(`waddup setting home panel `);
        setHome(true);
        setAddChild(false);
        setCreateToken(false);
    };

    const setAddChildPanel = () => {
        console.log(`waddup setting add child panel `);
        setHome(false);
        setAddChild(true);
        setCreateToken(false);
    };

    const setCreateTokenPanel = (props) => {
        console.log(`waddup setting create token panel`);
        setHome(false);
        setAddChild(false);
        setCreateToken(true);
    };
    return (
        <main className={styles.main}>
            <Sidebar setHomePanel={setHomePanel} setAddChildPanel={setAddChildPanel} setCreateTokenPanel={setCreateTokenPanel} />
            
            <div className={styles.content}>
            <ConnectWallet />
                {/* {home ? (
                    <div className={styles.badgeContainer}>
                        <Badge />
                        <Badge />
                        <Badge />
                    </div>
                ) : null} */}
                {home ? (<div className={styles.panelContainer}> <HomePanel /> </div>) : null }
                {/* {addChild ? <AddChildPanel /> : null}
                {createToken ? <CreateTokenPanel /> : null} */}
            </div>
        </main>
    );
};

export default Child;
