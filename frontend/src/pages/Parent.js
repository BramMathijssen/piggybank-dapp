import React, { useState } from "react";
import HomePanel from "../components/ParentPage/Home/HomePanel";
import AddChildPanel from "../components/ParentPage/AddChild/AddChildPanel";
import CreateTokenPanel from "../components/ParentPage/CreateToken/CreateTokenPanel";
import Sidebar from "../components/ParentPage/Sidebar";
import ConnectWallet from "../components/ParentPage/Layout/ConnectWallet";

import styles from "./Parent.module.scss";

const Parent = () => {
    const [home, setHome] = useState(true);
    const [addChild, setAddChild] = useState(false);
    const [createToken, setCreateToken] = useState(false);

    const setHomePanel = () => {
        console.log(`setting home panel `);
        setHome(true);
        setAddChild(false);
        setCreateToken(false);
    };

    const setAddChildPanel = () => {
        console.log(`setting add child panel `);
        setHome(false);
        setAddChild(true);
        setCreateToken(false);
    };

    const setCreateTokenPanel = (props) => {
        console.log(`setting create token panel`);
        setHome(false);
        setAddChild(false);
        setCreateToken(true);
    };
    return (
        <main className={styles.main}>
            <Sidebar setHomePanel={setHomePanel} setAddChildPanel={setAddChildPanel} setCreateTokenPanel={setCreateTokenPanel} />
            <div className={styles.content}>
                <ConnectWallet />
                {home ? <HomePanel /> : null}
                {addChild ? <AddChildPanel /> : null}
                {createToken ? <CreateTokenPanel /> : null}
            </div>
        </main>
    );
};

export default Parent;
