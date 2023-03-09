import React, { useContext, useEffect, useState } from "react";
import EthersContext from "./ethers-context";

const TokenContext = React.createContext({
    tokens: null,
    children: null,
    setTokens: () => {},
});

export const TokenContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext);

    const [transactions, setTransactions] = useState();

    useEffect(() => {
        console.log(`useEFFECTING`)
        if (!ethersCtx.userAddress) return;

        const getEvents = async () => {
            console.log("running effect in transaction context");
            const eventFilter = ethersCtx.contract.filters.AllowanceClaimed(ethersCtx.userAddress);
            const events = await ethersCtx.contract.queryFilter(eventFilter);
            console.log(`AFTERRR`)

            setTransactions(events);
        };

        getEvents();
    }, [ethersCtx]);

    return (
        <TokenContext.Provider
            value={{
                transactions: transactions,
            }}
        >
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
