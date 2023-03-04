export const truncateAddress = (addy) => {
    const truncatedAddress = addy.slice(0, 3) + "..." + addy.slice(-3);

    return truncatedAddress;
};
