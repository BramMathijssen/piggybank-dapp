import { ethers } from "ethers";
import abi from "../../../constants/tokenCreator.abi.json";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./Tokens.module.scss";
import { truncateAddress } from "../../../helpers/truncateAddress";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { weiToEth } from "../../../helpers/weiToEth";

const Tokens = () => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);
    const [tokenBalanceList, setTokenBalanceList] = useState([]);

    useEffect(() => {
        for (let i = 0; i < tokens.length; i++) {
            const erc20Contract = new ethers.Contract(tokens[i].tokenAddress, abi, ethersCtx.signer);

            const getTokens = async () => {
                const contractAddress = await ethersCtx.contract.address;
                const bal = await erc20Contract.balanceOf(contractAddress);
                const totalSupply = await erc20Contract.totalSupply();

                // create key-value pair of tokenAddress + current balance
                setTokenBalanceList((prev) => [...prev, { tokenAddress: tokens[i].tokenAddress, balance: bal.toString(), totalSupply: totalSupply.toString() }]);
            };

            getTokens();
        }
    }, [tokens, ethersCtx.contract, ethersCtx.userAddress]);

    const getBalanceForToken = (tokenAddress) => {
        try {
            for (let i = 0; i < tokenBalanceList.length; i++) {
                if (tokenBalanceList[i].tokenAddress === tokenAddress) {
                    return tokenBalanceList[i].balance;
                }
            }
        } catch {
            console.log(`error`);
        }
    };

    const getTotalSupplyForToken = (tokenAddress) => {
        try {
            for (let i = 0; i < tokenBalanceList.length; i++) {
                if (tokenBalanceList[i].tokenAddress === tokenAddress) {
                    return tokenBalanceList[i].totalSupply;
                }
            }
        } catch {
            console.log(`error`);
        }
    };

    return (
        <div className={styles.tokens}>
            {tokens &&
                tokens.map((token) => {
                    return (
                        <div key={token.tokenAddress} className={styles.flexContainer}>
                            <div className={styles.avatar}>
                                <Jazzicon diameter={33} seed={jsNumberForAddress(token.tokenAddress)} />
                            </div>
                            <div className={styles.tokenInfo}>
                                <p className={styles.name}>{token.name}</p>
                                <p className={styles.address}>{truncateAddress(token.tokenAddress)}</p>
                            </div>
                            <div className={styles.tokenAmounts}>
                                <p className={styles.totalSupply}>
                                    Total Supply: <span>{weiToEth(getTotalSupplyForToken(token.tokenAddress))}</span>
                                </p>
                                <p className={styles.balance}>
                                    Balance: <span>{weiToEth(getBalanceForToken(token.tokenAddress))}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Tokens;
