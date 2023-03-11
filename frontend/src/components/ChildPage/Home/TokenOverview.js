import React, { useContext, useRef, useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import EthersContext from "../../../context/ethers-context";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./TokenOverview.module.scss";

const TokenOverview = () => {
    const ethersCtx = useContext(EthersContext);
    const [parentAddress, setParentAddress] = useState();
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    useEffect(() => {
        const getMyParentAddress = async () => {
            if (!ethersCtx.contract) return;

            const parentAddressTemp = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
            setParentAddress(parentAddressTemp);
        };
        getMyParentAddress();
    }, [ethersCtx]);

    console.log(tokens);

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
                <p>Token 1</p>
                <p>Token 1</p>
                <p>Token 1</p>

            </div>
            <div className={styles.pieChartContainer}>
                <PieChart width={300} height={300}>
                    <Pie data={data} label={renderLabel} cx={120} cy={200} innerRadius={40} outerRadius={90} fill="#8884d8" paddingAngle={1} dataKey="value">
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
