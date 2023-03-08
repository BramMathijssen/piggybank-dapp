import { useEffect, useState, useContext } from "react";
import EthersContext from "../context/ethers-context";

export const useEvent = (eventName, changed, ...args) => {
    const ethersCtx = useContext(EthersContext);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!ethersCtx.userAddress) return;

        const getEvents = async () => {
            console.log('running effect in useEvent')
            const eventFilter = ethersCtx.contract.filters[eventName](...args);
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            const eventList = [];

            for (let i = 0; i < events.length; i++) {
                const args = events[i].args[2];
                const obj = { ...args };
                eventList.push(obj);
            }

            setEvents(eventList);
        };

        getEvents();
    }, [ethersCtx, eventName, changed]);

    return events;
};
