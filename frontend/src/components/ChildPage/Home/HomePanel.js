import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./HomePanel.module.scss";

const HomePanel = () => {
    const [parentAddress, setParentAddress] = useState();
    const [myClaim, setMyClaim] = useState();
    const ethersCtx = useContext(EthersContext);

    console.log(ethersCtx.userAddress)


    useEffect(() => {
        const getMyParent = async () => {
            const tx = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);

            setParentAddress(tx);
            console.log(tx)

        };
        const getMyClaim = async () => {
            const tx = await ethersCtx.contract.parentToChildMappingNested(parentAddress, ethersCtx.userAddress);
            console.log(tx)
            // setMyClaim(myClaim);
        };
        getMyParent();
        getMyClaim();
    }, []);

    console.log(parentAddress)
    console.log(myClaim)

    return (
        <>
            <h2 className={styles.title}>Panel Content</h2>
            <div className={styles.rowContainer}>
                <p>Yooo</p>
                <div className={styles.myParentContainer}></div>
                <div className={styles.myClaims}></div>
                {/* <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row /> */}
            </div>
        </>
    );
};

export default HomePanel;
