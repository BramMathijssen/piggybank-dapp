import { useEffect, useState, useContext } from "react";
import EthersContext from "../context/ethers-context";

export const useEventCustom = (eventName, changed, indices, ...args) => {
    const ethersCtx = useContext(EthersContext);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!ethersCtx.userAddress) return;

        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters[eventName](...args);
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            const eventList = [];

            for (let i = 0; i < events.length; i++) {
                // gets the specified indexes from the events.args array
                const args = indices.map(index => events[i].args[index]);
                eventList.push(args);
              }

            setEvents(eventList);
        };

        getEvents();
    }, [ethersCtx, eventName, changed]);

    return events;
};
