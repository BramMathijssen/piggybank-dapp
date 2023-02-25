import React from "react";
import Button from "../../UI/Button";

import styles from "./CreateTokenPanel.module.scss";

const CreateTokenPanel = () => {
    return (
        <>
            <h2 className={styles.title}>Create New Token</h2>
            <div className={styles.createTokenPanel}>
                <form className={styles.form}>
                    <label>Token Name</label>
                    <input type="text"></input>
                    <label>Token Symbol</label>
                    <input type="text"></input>
                    <label>Total Supply</label>
                    <input type="text"></input>
                    <div className={styles.action}>
                        <Button type="submit" content="submit" size="small" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateTokenPanel;
