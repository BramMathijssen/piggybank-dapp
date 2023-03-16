import React, { useContext } from "react";
import ChildContext from "../../../context/child-context";
import ChildrenTable from "./ChildrenTable";

import styles from "./ChildrenOverview.module.scss";

const ChildrenOverview = (props) => {
    // we are using context to get children directly from chain instead of from events, since the children data is mutable
    const childCtx = useContext(ChildContext);
    const children = childCtx.children;

    return (
        <div className={styles.childrenOverview}>
            <ChildrenTable children={children} />
        </div>
    );
};

export default ChildrenOverview;
