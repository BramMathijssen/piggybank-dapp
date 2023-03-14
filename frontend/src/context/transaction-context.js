import React, { useContext, useEffect, useState } from "react";
import EthersContext from "./ethers-context";

const TransactionContext = React.createContext({
    transactions: null,
    setTransactions: () => {},
});

export const TransactionContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext);

    const [transactions, setTransactions] = useState();

    useEffect(() => {
        if (!ethersCtx.userAddress) return;
        console.log(`in transaction context`)

        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.AllowanceClaimed(ethersCtx.userAddress);
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            setTransactions(events);
        };

        getEvents();
    }, [ethersCtx]);

    return (
        <TransactionContext.Provider
            value={{
                transactions: transactions,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionContext;
