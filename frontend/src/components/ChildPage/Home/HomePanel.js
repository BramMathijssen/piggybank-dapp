import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import Timer from "../CountdownTimer";
import styles from "./HomePanel.module.scss";

const HomePanel = () => {
  const [parentAddress, setParentAddress] = useState();
  const [myClaim, setMyClaim] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const ethersCtx = useContext(EthersContext);

  useEffect(() => {
    const getMyParentAndClaim = async () => {
      if (!ethersCtx.contract) return;

      const parentTx = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
      setParentAddress(parentTx);

      const claimTx = await ethersCtx.contract.parentToChildMappingNested(parentTx, ethersCtx?.userAddress);
      setMyClaim(claimTx);

      const currentTime = await ethersCtx.contract.getCurrentTime();
      const leftTime = claimTx.nextClaimPeriod.toNumber() - currentTime.toNumber();
      setTimeLeft(leftTime);
    };
    getMyParentAndClaim();
  }, [ethersCtx]);

  return (
    <>
      {timeLeft ? <Timer timeLeft={timeLeft} /> : null}
      <h2 className={styles.title}>Panel Content</h2>
      <div className={styles.rowContainer}>
        <p>Yooo</p>
        <div className={styles.myParentContainer}></div>
        <div className={styles.myClaims}></div>
        {/* <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row /> */}
      </div>
    </>
  );
};

export default HomePanel;