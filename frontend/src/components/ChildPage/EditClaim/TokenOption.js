import React, { useContext, useEffect, useState } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import EthersContext from "../../../context/ethers-context";
import { truncateAddress } from "../../../helpers/truncateAddress";
import { weiToEth } from "../../../helpers/weiToEth";

import styles from "./TokenOption.module.scss";

const TokenOption = ({ token, setNewTokenPreference }) => {
    const ethersCtx = useContext(EthersContext);
    const [tokenBalance, setTokenBalance] = useState();

    useEffect(() => {
        const getBalanceOfTokens = async () => {
            if (!ethersCtx.contract) return;
            const amount = await ethersCtx.contract.getBalanceTest(token.tokenAddress);
            setTokenBalance(amount.toString());
        };
        getBalanceOfTokens();
    }, [ethersCtx, ethersCtx.userAddress, token]);

    return (
        <div className={styles.tokenOptions}>
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
        </div>
    );
};

export default TokenOption;
