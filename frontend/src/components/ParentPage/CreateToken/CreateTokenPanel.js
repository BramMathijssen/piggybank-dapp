import React, {useState } from "react";
import TokenOverview from "./TokenOverview";
import CreateTokenForm from "./CreateTokenForm";

import styles from "./CreateTokenPanel.module.scss";

const CreateTokenPanel = () => {
    const [tokenAdded, setTokenAdded] = useState(false);

    return (
        <div className={styles.flexContainer}>
            <div className={styles.createTokenContainer}>
                <h2 className={styles.title}>Create Token</h2>
                <CreateTokenForm setTokenAdded={setTokenAdded} />
            </div>
            <div className={styles.overviewContainer}>
                <h2 className={styles.title}>My Tokens</h2>
                <TokenOverview tokenAdded={tokenAdded} />
            </div>
        </div>
    );
};

export default CreateTokenPanel;
