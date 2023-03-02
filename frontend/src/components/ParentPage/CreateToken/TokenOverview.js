import { poll } from "ethers/lib/utils";
import React, { useContext, useRef, useState, useEffect } from "react";
import EthersContext from "../../../context/ethers-context";

import styles from "./TokenOverview.module.scss";

const TokenOverview = ({ tokenAdded }) => {
    const ethersCtx = useContext(EthersContext);
    const [tokens, setTokens] = useState([{ tokenName: "", symbol: "", totalSupply: "" }]);

    useEffect(() => {
        console.log(`running useEffect`);
        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.TokenCreated(ethersCtx.userAddress, null, null);
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            const tokenList = []

            for (let i = 0; i < events.length; i++) {
                const { name, symbol, supply } = events[i].args[2];
                const obj = { tokenName: name, symbol: symbol, totalSupply: supply };
                tokenList.push(obj)
            }

            setTokens(tokenList);
        };
        getEvents();
    }, [tokenAdded, ethersCtx]);


    return (
        <div className={styles.overviewContainer}>
            <ul>
                {tokens  && tokens.map(token => {
                    return <li key={Math.random()}>{token.tokenName} {token.symbol} </li>
                })}
            </ul>
            TokenOverview
        </div>
    );
};

export default TokenOverview;
