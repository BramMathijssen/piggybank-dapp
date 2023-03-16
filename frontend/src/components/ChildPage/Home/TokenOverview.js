import { ethers } from "ethers";
import React, { useContext, useRef, useState, useEffect } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from "recharts";
import EthersContext from "../../../context/ethers-context";
import { truncateAddress } from "../../../helpers/truncateAddress";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./TokenOverview.module.scss";

const TokenOverview = ({ parentAddress, claimed }) => {
    const ethersCtx = useContext(EthersContext);
    // const [parentAddress, setParentAddress] = useState();
    const [tokenBalanceList, setTokenBalanceList] = useState();
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    // useEffect(() => {
    //     const getMyParentAddress = async () => {
    //         if (!ethersCtx.contract) return;

    //         const parentAddressTemp = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
    //         setParentAddress(parentAddressTemp);
    //     };
    //     getMyParentAddress();
    // }, [ethersCtx]);

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

            // only save the tokens which have an amount owned of > 0
            const filteredTokenList = resolvedTokenList.filter((token) => token.amount > 0);

            setTokenBalanceList(filteredTokenList);
        };
        getBalanceOfTokens();
    }, [ethersCtx, ethersCtx.userAddress, tokens, claimed]);

    // console.log(tokens);
    console.log(tokenBalanceList);

    // const data = [
    //     { name: "Group A", value: 400 },
    //     { name: "Group B", value: 300 },
    //     { name: "Group C", value: 300 },
    //     { name: "Group D", value: 200 },
    // ];

    // (unused) code to show legend for the piechart
    const renderColorfulLegendText = (value, entry) => {
        return <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>{value}</span>;
    };

    // (used) code to show a lined label connected to the piechart
    let renderLabel = function (entry) {
        return entry.name;
    };

    const COLORS = ["#00FFC3", "#26547C", "#EF476F", "#FF8042"];

    return (
        <div className={styles.tokenOverview}>
            <div className={styles.tokensContainer}>
                <h3>My Tokens</h3>
                {tokenBalanceList &&
                    tokenBalanceList.map((token) => {
                        // check if the amount owned is bigger than 0
                        return token.amount > 0 ? (
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
                        ) : null;
                    })}
            </div>
            <div className={styles.pieChartContainer}>
                <ResponsiveContainer>
                    <PieChart width={100} height={200}>
                        {tokenBalanceList && (
                            <Pie data={tokenBalanceList} width={"100"} cx="50%" cy="50%" innerRadius={40} outerRadius={90} fill="#8884d8" paddingAngle={2} dataKey="amount" label={renderLabel} stroke={1}>
                                {tokenBalanceList.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        )}
                        {/* <Legend height={50} width={500} iconType="circle" layout="vertical" verticalAlign="middle" iconSize={10} padding={5} formatter={renderColorfulLegendText} /> */}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TokenOverview;
