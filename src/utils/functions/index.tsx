export const calcPercentage = (valueUp: string, valueDown: string) => {
    if (valueUp && valueDown) {
        const percentage = (Number(valueUp) / Number(valueDown)) * 100;
        return percentage.toFixed(2);
    }
    return 0;
};


export const numberWithCommas = (x: string) => {
    if (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }
    return 0;
}