import React, { useContext, useRef, useState, useEffect } from "react";

import styles from "./CreateTokenPanel.module.scss";
import EthersContext from "../../../context/ethers-context";
import TokenOverview from "./TokenOverview";
import CreateTokenForm from "./CreateTokenForm";

const CreateTokenPanel = () => {
    const contractNameRef = useRef();
    const contractSymbolRef = useRef();
    const contractSupplyRef = useRef();

    // const [changed, setChanged] = useState(false);
    const [tokenAdded, setTokenAdded] = useState(false);

    const ethersCtx = useContext(EthersContext);

    const createToken = async (e) => {
        e.preventDefault();
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.createNewToken(contractSupplyRef.current.value, contractNameRef.current.value, contractSymbolRef.current.value);
        await tx.wait(1);
        setTokenAdded((current) => !current); // toggle boolean to force a re-render on TokenOverview
    };

    console.log(`rendering createTokenPanel`);
    return (
        <div className={styles.flexContainer}>
            <div className={styles.addChildContainer}>
                <h2 className={styles.title}>Create Token</h2>
                <CreateTokenForm setTokenAdded={setTokenAdded} />
            </div>
            <div className={styles.overviewContainer}>
                <h2 className={styles.title}>My Tokens</h2>
                <TokenOverview tokenAdded={tokenAdded} />
            </div>
        </div>
        // <>
        //     <h2 className={styles.title}>Create New Token</h2>
        //     <div className={styles.createTokenPanel}>
        //         <div className={styles.createContainer}>
        //             <form onSubmit={createToken}>
        //                 <div className={styles.formContainer}>
        //                     <label>Token Name</label>
        //                     <input type="text" ref={contractNameRef}></input>
        //                     <label>Symbol</label>
        //                     <input type="text" ref={contractSymbolRef}></input>
        //                     <label>Supply</label>
        //                     <input type="number" ref={contractSupplyRef}></input>
        //                     <button className={styles.button}> deploy</button>
        //                 </div>
        //             </form>
        //         </div>
        //         <TokenOverview tokenAdded={changed} />
        //     </div>
        // </>
    );
};

export default CreateTokenPanel;
