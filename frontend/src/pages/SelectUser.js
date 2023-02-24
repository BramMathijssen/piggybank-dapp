import React from "react";
import User from "../components/SelectUserPage/User";
import Card from "../components/UI/Card";

import styles from "../pages/SelectUser.module.scss";

const SelectUser = () => {
    return (
        <main className={styles.main}>
            <div className={styles.userContainer}>
                <Card>
                    <User type="Parent" />
                </Card>
                <Card>
                    <User type="Kid" />
                </Card>
            </div>
        </main>
    );
};

export default SelectUser;
