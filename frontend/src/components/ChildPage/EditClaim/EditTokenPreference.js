import React, { useContext, useRef, useState, useEffect } from "react";

import styles from "./EditTokenPreference.module.scss";
import EthersContext from "../../../context/ethers-context";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { useEvent } from "../../../hooks/useEvent";
import { truncateAddress } from "../../../helpers/truncateAddress";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";
import TokenOption from "./TokenOption";
import { weiToEth } from "../../../helpers/weiToEth";

const EditTokenPreference = ({ child, parentAddress, setChanged }) => {
    const [tokenBalance, setTokenBalance] = useState();
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    const setNewTokenPreference = async (tokenAddress) => {
        console.log(`Creating token`);
        const tx = await ethersCtx.contract.setChildTokenPreference(tokenAddress);
        await tx.wait(1);
        setChanged((prev) => !prev);
    };

    useEffect(() => {
        const getBalanceOfTokens = async () => {
            if (!ethersCtx.contract) return;
            const amount = await ethersCtx.contract.getBalanceTest(child.tokenPreference);
            setTokenBalance(amount.toString());
        };
        getBalanceOfTokens();
    }, [ethersCtx, ethersCtx.userAddress, child]);

    return (
        <div className={styles.tokenPreference}>
            <h3>Currently Selected Token</h3>
            <div className={styles.currentToken}>
                <div className={styles.tokenInfo}>
                    <div className={styles.tokenAvatar}>
                        <Jazzicon diameter={45} seed={jsNumberForAddress(child.tokenPreference)} />
                    </div>
                    <div className={styles.tokenDetails}>
                        <p>{getNameByAddress(tokens, child.tokenPreference)}</p>
                        <p>{child.tokenPreference}</p>
                    </div>
                </div>
                <div className={styles.amountOwned}>
                    <p className={styles.amount}>{weiToEth(tokenBalance)}</p>
                    <p className={styles.tokenSymbol}>{getSymbolByAddress(tokens, child.tokenPreference)}</p>
                </div>
            </div>
            <h3 className={styles.pickTokenTitle}>Pick a Token</h3>
            <div className={styles.tokenOptionsContainer}>
                {tokens.map((token) => {
                    // only display tokens which are not currently prefered
                    if (token.tokenAddress !== child.tokenPreference) {
                        return <TokenOption token={token} setNewTokenPreference={setNewTokenPreference} />;
                    }
                })}
            </div>
        </div>
    );
};

export default EditTokenPreference;
