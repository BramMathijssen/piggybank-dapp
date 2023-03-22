import React, { useContext, useState, useEffect } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import EthersContext from "../../../../context/ethers-context";
import { truncateAddress } from "../../../../helpers/truncateAddress";
import { weiToEth } from "../../../../helpers/weiToEth";
import { useEvent } from "../../../../hooks/useEvent";

import styles from "./TokenOverview.module.scss";

const TokenOverview = ({ parentAddress, claimed }) => {
    const ethersCtx = useContext(EthersContext);
    const [tokenBalanceList, setTokenBalanceList] = useState();
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

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

    // Render a lined label connected to the piechart
    let renderLabel = function (entry) {
        return entry.name;
    };

    const COLORS = ["#00FFC3", "#26547C", "#EF476F", "#FF8042"];

    return (
        <div className={styles.tokenOverview}>
            <div className={styles.tokenListContainer}>
                <h3 className={styles.title}>My Tokens</h3>
                {tokenBalanceList &&
                    tokenBalanceList.map((token) => {
                        // check if the amount owned is bigger than 0
                        return token.amount > 0 ? (
                            <div key={token.address} className={styles.tokenContainer}>
                                <div className={styles.tokenInfo}>
                                    <div className={styles.tokenIcon}>
                                        <Jazzicon diameter={30} seed={jsNumberForAddress(token.address)} />
                                    </div>
                                    <div className={styles.tokenNameAddress}>
                                        <p className={styles.name}>{token.name}</p>
                                        <p className={styles.address}>{truncateAddress(token.address)}</p>
                                    </div>
                                </div>
                                <div className={styles.tokenAmount}>
                                    <p className={styles.amount}>{weiToEth(token.amount)}</p>
                                </div>
                            </div>
                        ) : null;
                    })}
            </div>
            <div className={styles.pieChartContainer}>
                <ResponsiveContainer>
                    <PieChart width={100} height={200}>
                        {tokenBalanceList && (
                            <Pie data={tokenBalanceList} width={"100"} cx="50%" cy="50%" innerRadius={40} outerRadius={90} fill="#8884d8" paddingAngle={1} dataKey="amount" label={renderLabel} stroke={1}>
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
