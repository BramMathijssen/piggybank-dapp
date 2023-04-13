import React, { useState } from "react";
import HomePanel from "../components/ParentPage/Home/HomePanel";
import AddChildPanel from "../components/ParentPage/AddChild/AddChildPanel";
import CreateTokenPanel from "../components/ParentPage/CreateToken/CreateTokenPanel";
import Sidebar from "../components/UI/Sidebar";
import ConnectWallet from "../components/UI/ConnectWallet";
import { motion } from "framer-motion";

import styles from "./Parent.module.scss";

const Parent = () => {
    const [home, setHome] = useState(true);
    const [addChild, setAddChild] = useState(false);
    const [createToken, setCreateToken] = useState(false);

    const setHomePanel = () => {
        setHome(true);
        setAddChild(false);
        setCreateToken(false);
    };

    const setAddChildPanel = () => {
        setHome(false);
        setAddChild(true);
        setCreateToken(false);
    };

    const setCreateTokenPanel = (props) => {
        setHome(false);
        setAddChild(false);
        setCreateToken(true);
    };

    // Define the links
    const parentLinks = [
        { label: "Home", onClick: setHomePanel },
        { label: "Add Child", onClick: setAddChildPanel },
        { label: "Create Token", onClick: setCreateTokenPanel },
    ];

    return (
        <main className={styles.main}>
            <Sidebar links={parentLinks} />
            <div className={styles.content}>
                <ConnectWallet />
                {home ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <HomePanel />
                    </motion.div>
                ) : null}
                {addChild ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <AddChildPanel />
                    </motion.div>
                ) : null}
                {createToken ? (
                    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <CreateTokenPanel />
                    </motion.div>
                ) : null}

                {/* <motion.div  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 1 }}>
                    {home ? <HomePanel /> : null}
                </motion.div>
                <motion.div  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 1 }}>
                    {addChild ? <AddChildPanel /> : null}
                </motion.div>
                <motion.div  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 1 }}>
                    {createToken ? <CreateTokenPanel /> : null}
                </motion.div> */}
            </div>
        </main>
    );
};

export default Parent;
