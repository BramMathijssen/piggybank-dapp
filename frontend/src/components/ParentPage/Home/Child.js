import React from "react";
import Card from "../../UI/Card";

import styles from "./Child.module.scss";

const Child = () => {
    return (
        <>
            {/* <Card> */}
            <div className={styles.child}>
                <p>I'm a Badge :)</p>
            </div>
            {/* </Card> */}
        </>
    );
};

export default Child;
