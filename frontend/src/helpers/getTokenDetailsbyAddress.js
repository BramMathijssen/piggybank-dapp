export const getNameByAddress = (array, address) => {
    if(!array) return;
    for (let i = 0; i < array.length; i++) {
        if (array[i][1] === address) {
            return array[i][2];
        }
    }
    return null; 
};

export const getSymbolByAddress = (array, address) => {
    if(!array) return;
    for (let i = 0; i < array.length; i++) {
        if (array[i][1] === address) {
            return array[i][3];
        }
    }
    return null; 
};
