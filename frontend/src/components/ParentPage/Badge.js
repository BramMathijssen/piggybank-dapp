import React from "react";
import Card from "../UI/Card";

import styles from "./Badge.module.scss";

const Badge = () => {
    return (
        <>
            {/* <Card> */}
                <div className={styles.badge}>
                    <p>I'm a Badge :)</p>
                </div>
            {/* </Card> */}
        </>
    );
};

export default Badge;
