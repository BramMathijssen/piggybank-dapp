import React, { useContext, useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";
import EthersContext from "./ethers-context";

const ChildContext = React.createContext({
    childAddressList: null,
    children: null,
    setChildren: () => {},
    setChildAddressList: () => {},
});

export const ChildContextProvider = (props) => {
    const ethersCtx = useContext(EthersContext);
    const seedData = useEvent("ChildAdded", ethersCtx.address, ethersCtx.userAddress);
    const [childAddressList, setChildAddressList] = useState();
    const [children, setChildren] = useState();

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
    }, [seedData]);

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
    }, [seedData, childAddressList, ethersCtx.userAddress]);

    // with this effect we get the child's parrent address, this way we can get the claim details
    // for the child claim page
    // useEffect(() => {
    //     const getMyParentAndClaim = async () => {
    //         if (!ethersCtx.contract) return;

    //         const parentAddress = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
    //         // setParentAddress(parentTx);

    //         const claimTx = await ethersCtx.contract.parentToChildMappingNested(parentAddress, ethersCtx?.userAddress);
    //         setMyClaim(claimTx);

    //         const currentTime = await ethersCtx.contract.getCurrentTime();
    //         const leftTime = claimTx.nextClaimPeriod.toNumber() - currentTime.toNumber();
    //         setTimeLeft(leftTime);
    //     };
    //     getMyParentAndClaim();
    // }, [ethersCtx]);

    console.log(childAddressList);

    console.log(`HERE WE GO`);
    console.log(children);
    console.log(`claim momento`);

    children && console.log(children[0])

    // if (children) {
    //     console.log(children[0].nextClaimPeriod.toString());
    // }
    //

    return (
        <ChildContext.Provider
            value={{
                setChildAddressList: setChildAddressList,
                setChildren: setChildren,
                children: children,
                childAddressList: childAddressList,
            }}
        >
            {props.children}
        </ChildContext.Provider>
    );
};

export default ChildContext;
