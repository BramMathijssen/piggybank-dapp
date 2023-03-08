import React, { useContext, useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import EthersContext from "./ethers-context";

const EventsContext = React.createContext({
    tokens: null,
    children: null,
    setTokens: () => {},
});

export const EventsContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext);
    // what is up with ethersCtx.address? volgens mij hoeven we maar 1 arg mee te geven?
    const seedData = useEvent("TokenCreated", ethersCtx.address, ethersCtx.userAddress);
    const seedDataTransactions = useEvent("AllowanceClaimed", null, ethersCtx.userAddress);
    const [tokens, setTokens] = useState(seedData);
    const [transactions, setTransactions] = useState(seedData);

    // initial load of current tokens
    useEffect(() => {
        setTokens(seedData);
    }, [seedData]);

    useEffect(() => {
        setTransactions(seedDataTransactions);
    }, [seedDataTransactions]);

    return (
        <EventsContext.Provider
            value={{
                tokens: tokens,
                transactions: transactions,
                setTokens: setTokens,
            }}
        >
            {props.children}
        </EventsContext.Provider>
    );
};

export default EventsContext;
