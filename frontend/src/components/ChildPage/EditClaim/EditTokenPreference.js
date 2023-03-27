
import React, { useContext, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { useEvent } from "../../../hooks/useEvent";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";
import TokenOption from "./TokenOption";
import { weiToEth } from "../../../helpers/weiToEth";
import { ethers } from "ethers";
import LoadingSpinner from "../../UI/LoadingSpinner";

import styles from "./EditTokenPreference.module.scss";

const EditTokenPreference = ({ child, parentAddress, setChanged }) => {
    const [tokenBalance, setTokenBalance] = useState();
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    const setNewTokenPreference = async (tokenAddress) => {
        try {
            ethersCtx.setLoading(true);
            console.log(`Creating token`);
            const tx = await ethersCtx.contract.setChildTokenPreference(tokenAddress);
            await tx.wait(1);
            ethersCtx.setLoading(false);
            setChanged((prev) => !prev);
        } catch (error) {
            console.log(`something went wrong with your transaction.${error}`);
            ethersCtx.setLoading(false);
        }
    };

    useEffect(() => {
        const getBalanceOfTokens = async () => {
            if (!ethersCtx.contract) return;
            // const amount = await ethersCtx.contract.getBalanceTest(child.tokenPreference);
            const amount = await ethersCtx.contract.getERC20Balance(child.tokenPreference);

            console.log(`AMOUNT`);

            console.log(ethers.utils.formatEther(amount));

            setTokenBalance(amount.toString());
        };
        getBalanceOfTokens();
    }, [ethersCtx, ethersCtx.userAddress, child]);

    return (
        <div className={styles.tokenPreferencePanel}>
            {ethersCtx.loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h3>Currently Selected Token</h3>
                    <div className={styles.currentToken}>
                        <div className={styles.tokenInfo}>
                            <div className={styles.tokenAvatar}>
                                <Jazzicon diameter={45} seed={jsNumberForAddress(child.tokenPreference)} />
                            </div>
                            <div className={styles.tokenDetails}>
                                <p className={styles.tokenName}>{getNameByAddress(tokens, child.tokenPreference)}</p>
                                <p className={styles.tokenAddress}>{child.tokenPreference}</p>
                            </div>
                        </div>
                        <div className={styles.amountOwned}>
                            <p className={styles.amount}>{weiToEth(tokenBalance)}</p>
                            <p className={styles.tokenSymbol}>{getSymbolByAddress(tokens, child.tokenPreference)}</p>
                        </div>
                    </div>
                    <h3 className={styles.pickTokenTitle}>Pick a Token</h3>
                    <div className={styles.tokenOptionsContainer}>
                        {tokens.map((token, index) => {
                            // only display tokens which are not currently prefered
                            if (token.tokenAddress !== child.tokenPreference) {
                                return <TokenOption key={index} token={token} setNewTokenPreference={setNewTokenPreference} />;
                            }
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default EditTokenPreference;
