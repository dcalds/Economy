export const calcPercentage = (valueUp: string, valueDown: string) => {
    if (valueUp && valueDown) {
        const percentage = (Number(valueUp) / Number(valueDown)) * 100;
        return percentage.toFixed(2);
    }
    return 0;
};