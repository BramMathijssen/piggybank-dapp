import { ethers } from "ethers";

export const weiToEth = (weiValue) => {
    try{
        const ethValue = ethers.utils.formatEther(weiValue);

        return ethValue.toString();;
    } catch{
        return;
    }
};
