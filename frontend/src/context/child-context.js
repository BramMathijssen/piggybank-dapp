import React, { useContext, useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import EthersContext from "./ethers-context";

const ChildContext = React.createContext({
    childAddressList: null,
    children: null,
    childAdded: null,
    setChildren: () => {},
    setChildAddressList: () => {},
    setChildAdded: () => {},
});

export const ChildContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext);
    const [childAddressList, setChildAddressList] = useState();
    const [children, setChildren] = useState();
    const [childAdded, setChildAdded] = useState(false);
    const seedData = useEvent("ChildAdded", childAdded, ethersCtx.userAddress);

    // first get all the children's addresses
    useEffect(() => {
        try {
            setChildren(seedData);

            let list = [];

            for (let i = 0; i < seedData.length; i++) {
                list.push(seedData[i].childAddress);
            }
            setChildAddressList(list);
        } catch (e) {
            console.log(`no children`);
        }
    }, [seedData, childAdded]);

    // second use all the children addresses to loop over the parent to child mapping
    useEffect(() => {
        const getChildren = async () => {
            try {
                let list = [];
                for (let i = 0; i < childAddressList.length; i++) {
                    const result = await ethersCtx.contract.parentToChildMappingNested(ethersCtx.userAddress, childAddressList[i]);
                    list.push(result);
                }
                setChildren(list);
            } catch {
                console.log(`error`);
            }
        };

        getChildren();
    }, [seedData, childAddressList, ethersCtx.userAddress, ethersCtx.contract, childAdded]);

    return (
        <ChildContext.Provider
            value={{
                setChildAddressList: setChildAddressList,
                setChildren: setChildren,
                setChildAdded: setChildAdded,
                children: children,
                childAddressList: childAddressList,
                childAdded: childAdded,
            }}
        >
            {props.children}
        </ChildContext.Provider>
    );
};

export default ChildContext;
