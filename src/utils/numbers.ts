export const parseFloatWithComma = (val: string): number => {
    const normalized = val.replace(",", ".")

    const num = Number(normalized);

    if (Number.isNaN(num)) {
        throw new Error("Failed to convert string with commas to float: " + val);
    }

    return num;
}
