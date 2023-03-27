import React, { useContext, useEffect, useState } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import EthersContext from "../../../context/ethers-context";
import { truncateAddress } from "../../../helpers/truncateAddress";
import { weiToEth } from "../../../helpers/weiToEth";
import { motion } from "framer-motion";

import styles from "./TokenOption.module.scss";

const TokenOption = ({ token, setNewTokenPreference }) => {
    const ethersCtx = useContext(EthersContext);
    const [tokenBalance, setTokenBalance] = useState();

    useEffect(() => {
        const getBalanceOfTokens = async () => {
            if (!ethersCtx.contract) return;
            // const amount = await ethersCtx.contract.getBalanceTest(token.tokenAddress);
            const amount = await ethersCtx.contract.getERC20Balance(token.tokenAddress);
            console.log(`AMOUNT`)
            console.log(amount);
            setTokenBalance(amount.toString());
        };
        getBalanceOfTokens();
    }, [ethersCtx, ethersCtx.userAddress, token]);

    console.log(`heeyyyy`)

    return (
        <motion.div
            className={styles.tokenOption}
            layout
            whileHover={{
                scale: 1.03,
                originX: 0,
                border: "2px solid black",
            }}
            transition={{ type: "spring", stiffness: 500 }}
        >
            <div className={styles.tokenOptionInfo}>
                <div className={styles.tokenOptionAvatar}>
                    <Jazzicon diameter={30} seed={jsNumberForAddress(token.tokenAddress)} />
                </div>
                <div className={styles.tokenOptionDetails}>
                    <p className={styles.tokenOptionName}>{token.name}</p>
                    <p className={styles.tokenOptionAddress}>{truncateAddress(token.tokenAddress)}</p>
                </div>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.tokenOptionAmountOwned}>
                    <p className={styles.tokenOptionAmount}>{weiToEth(tokenBalance)}</p>
                    <p className={styles.tokenOptionSymbol}>{token.symbol}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.pickButton} onClick={() => setNewTokenPreference(token.tokenAddress)}>
                        Pick
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TokenOption;
