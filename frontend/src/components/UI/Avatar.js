import React, { useContext } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import EthersContext from "../../context/ethers-context";

import styles from "./Avatar.module.scss";

const Avatar = () => {
    const ethersCtx = useContext(EthersContext);
    return <div className={styles.avatarContainer}>{ethersCtx.userAddress ? <Jazzicon diameter={100} seed={jsNumberForAddress(ethersCtx.userAddress)} paperStyles={{ width: "100%", height: "100%" }} svgStyles={{ width: "100%", height: "100%" }} /> : null}</div>;
};

export default Avatar;
