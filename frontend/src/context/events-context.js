import React, { useContext, useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import EthersContext from "./ethers-context";

const EventsContext = React.createContext({
    tokens: null,
    children: null,
    setTokens: () => {}
});

export const EventsContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext)
    const seedData = useEvent("TokenCreated", ethersCtx.address, ethersCtx.userAddress);
    const [tokens, setTokens] = useState(seedData);

    // initial load of current tokens
    useEffect(()=>{
        setTokens(seedData)
    },[seedData])

    return <EventsContext.Provider value={{
        tokens: tokens,
        setTokens: setTokens
    }}>{props.children}</EventsContext.Provider>;
};

export default EventsContext;
