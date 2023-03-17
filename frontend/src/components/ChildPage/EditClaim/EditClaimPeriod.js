import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./EditClaimPeriod.module.scss";

const EditClaimPeriod = () => {
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    const [changed, setChanged] = useState(false);

    const ethersCtx = useContext(EthersContext);

    const setClaimMomentDaily = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentDaily();
        await tx.wait(1);
    };

    const setClaimMomentWeekly = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentWeekly();
        await tx.wait(1);
    };

    const setClaimMomentMonthly = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildClaimMomentMonthly();
        await tx.wait(1);
    };

    return (
        <div className={styles.claimPeriod}>
            <h2 className={styles.title}>Create New Token</h2>
            <div className={styles.createTokenPanel}>
                <div className={styles.createContainer}>
                    <button onClick={setClaimMomentDaily}>Set Daily</button>
                    <button onClick={setClaimMomentWeekly}>Set Weekly</button>
                    <button onClick={setClaimMomentMonthly}>Set Monthly</button>
                    {/* <form onSubmit={createToken}>
                        <div className={styles.formContainer}>
                            <label>Token Name</label>
                            <input type="text" ref={contractNameRef}></input>
                            <label>Symbol</label>
                            <input type="text" ref={contractSymbolRef}></input>
                            <label>Supply</label>
                            <input type="number" ref={contractSupplyRef}></input>
                            <button className={styles.button}> deploy</button>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    );
};
export default EditClaimPeriod;
