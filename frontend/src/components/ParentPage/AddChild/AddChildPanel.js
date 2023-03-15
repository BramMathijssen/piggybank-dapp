import React, { useContext } from "react";

import AddChildForm from "./AddChildForm";
import ChildrenOverview from "./ChildrenOverview";

import styles from "./AddChildPanel.module.scss";
import ChildContext from "../../../context/child-context";

const AddChildPanel = () => {
    const childCtx = useContext(ChildContext);

    return (
        <div className={styles.flexContainer}>
            <div className={styles.addChildContainer}>
                <h2 className={styles.title}>Add Child</h2>
                <AddChildForm />
            </div>
            <div className={styles.overviewContainer}>
                <h2 className={styles.title}>My Children</h2>
                <ChildrenOverview childAdded={childCtx.childAdded} />
            </div>
        </div>
    );
};

export default AddChildPanel;
