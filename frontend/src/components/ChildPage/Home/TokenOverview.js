import { ethers } from "ethers";
import React, { useContext, useRef, useState, useEffect } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import EthersContext from "../../../context/ethers-context";
import { truncateAddress } from "../../../helpers/truncateAddress";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./TokenOverview.module.scss";

const TokenOverview = () => {
    const ethersCtx = useContext(EthersContext);
    const [parentAddress, setParentAddress] = useState();
    const [tokenBalanceList, setTokenBalanceList] = useState();
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    useEffect(() => {
        const getMyParentAddress = async () => {
            if (!ethersCtx.contract) return;

            const parentAddressTemp = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
            setParentAddress(parentAddressTemp);
        };
        getMyParentAddress();
    }, [ethersCtx]);

    // possibly move this to an seperate hook
    useEffect(() => {
        const getBalanceOfTokens = async () => {
            if (!ethersCtx.contract) return;

            const promises = tokens.map(async (token) => {
                const amount = await ethersCtx.contract.getBalanceTest(token.tokenAddress);
                return {
                    name: token.name,
                    address: token.tokenAddress,
                    amount: amount.toNumber(),
                };
            });
            const resolvedTokenList = await Promise.all(promises);

            setTokenBalanceList(resolvedTokenList);
        };
        getBalanceOfTokens();
    }, [ethersCtx, ethersCtx.userAddress, tokens]);

    // console.log(tokens);
    console.log(tokenBalanceList);

    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
    ];

    let renderLabel = function (entry) {
        return entry.name;
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className={styles.tokenOverview}>
            <div className={styles.tokensContainer}>
                <h3>My Tokens</h3>
                {tokenBalanceList &&
                    tokenBalanceList.map((token) => {
                        return (
                            <div className={styles.flexContainer}>
                                <div className={styles.tokenInfo}>
                                    <div className={styles.tokenIcon}>
                                        <Jazzicon diameter={35} seed={jsNumberForAddress(token.address)} />
                                    </div>
                                    <div className={styles.tokenName}>
                                        <p>{token.name}</p>
                                        <p>{truncateAddress(token.address)}</p>
                                    </div>
                                </div>
                                <div className={styles.tokenAmount}>
                                    <p>{token.amount}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className={styles.pieChartContainer}>
                <PieChart width={300} height={400}>
                    <Pie data={tokenBalanceList} label={renderLabel} cx={200} cy={200} innerRadius={40} outerRadius={90} fill="#8884d8" paddingAngle={1} dataKey="amount">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default TokenOverview;
