import { constants, ethers } from "ethers";
import abi from "../../../constants/tokenCreator.abi.json";
import React, { useContext, useEffect, useState } from "react";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./Tokens.module.scss";

const Tokens = () => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);
    const [balance, setBalance] = useState();

    useEffect(() => {
        if (!ethersCtx.contract) return;
        if (!tokens) return;
        try {
            for (let i = 0; i < tokens.length; i++) {
                const erc20Contract = new ethers.Contract(tokens[i].tokenAddress, abi, ethersCtx.signer);

                const getTokens = async () => {
                    const contractAddress = await ethersCtx.contract.contractAddress();
                    const bal = await erc20Contract.balanceOf(contractAddress);
                    const totalSupply = await erc20Contract.totalSupply();

                    // create key-value pair of tokenAddress + current balance
                    setBalance((prev) => [prev, { tokenAddress: tokens[i].tokenAddress, balance: bal.toString(), totalSupply: totalSupply.toString() }]);
                };

                getTokens();
            }
        } catch {
            console.log("error");
        }
    }, [tokens, ethersCtx.contract, ethersCtx.userAddress]);

    const getBalanceForToken = (tokenAddress) => {
        try {
            for (let i = 0; i < balance.length; i++) {
                if (balance[i].tokenAddress === tokenAddress) {
                    console.log(balance[i].balance);
                    return balance[i].balance;
                }
            }
        } catch {
            console.log(`error`);
        }
    };

    const getTotalSupplyForToken = (tokenAddress) => {
        try {
            for (let i = 0; i < balance.length; i++) {
                if (balance[i].tokenAddress === tokenAddress) {
                    return balance[i].totalSupply;
                }
            }
        } catch {
            console.log(`error`);
        }
    };

    console.log(tokens);
    console.log(balance);

    return (
        <div className={styles.tokens}>
            {tokens &&
                tokens.map((token) => {
                    console.log(token);
                    return (
                        <>
                            <p>{token.name}</p>
                            <p>{token.tokenAddress}</p>
                            <p>balance: {getBalanceForToken(token.tokenAddress)}</p>
                            <p>Total Supply: {getTotalSupplyForToken(token.tokenAddress)}</p>
                        </>
                    );
                })}
        </div>
    );
};

export default Tokens;
