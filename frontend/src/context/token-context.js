import React, { useContext, useEffect, useState } from "react";
import EthersContext from "./ethers-context";

const TokenContext = React.createContext({
    tokens: null,
    setTokens: () => {},
});

export const TokenContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext);

    const [tokens, setTokens] = useState();

    useEffect(() => {
        console.log(`in tokenContext provider`)
        if (!ethersCtx.userAddress) return;

        const getEvents = async () => {
            console.log("running effect in token context");
            const eventFilter = ethersCtx.contract.filters.TokenCreated(ethersCtx.userAddress);
            const events = await ethersCtx.contract.queryFilter(eventFilter);
            console.log(`AFTERRR`)

            const tokens = events.map((token) => token.args.token)

            setTokens(tokens);
        };

        getEvents();
    }, [ethersCtx.userAddress, ethersCtx.contract]);

    console.log(tokens)

    return (
        <TokenContext.Provider
            value={{
                tokens: tokens,
            }}
        >
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
