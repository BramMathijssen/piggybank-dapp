import { useEffect, useState } from 'react';

export const useChildAddedEvents = (ethersCtx) => {
  const [myChildren, setMyChildren] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventFilter = ethersCtx.contract.filters.ChildAdded(ethersCtx.userAddress, null, null);
      const events = await ethersCtx.contract.queryFilter(eventFilter);

      const childList = [];

      for (let i = 0; i < events.length; i++) {
        const { name, childAddress, claimPeriod, nextClaimPeriod, baseAmount, claimableAmount, tokenPreference } = events[i].args[2];
        const obj = { childName: name, childAddress: childAddress, claimPeriod: claimPeriod, nextClaimPeriod: nextClaimPeriod, baseAmount: baseAmount, claimableAmount: claimableAmount, tokenPreference: tokenPreference };
        childList.push(obj);
      }

      setMyChildren(childList);
    };

    getEvents();
  }, [ethersCtx]);

  return myChildren;
};