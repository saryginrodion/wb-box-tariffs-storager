const A_CHARCODE = 65
export const indexToSpreadsheetLetter = (ind: number): string => {
    let result = "";
    let remaining = ind + 1;

    while (remaining > 0) {
        const currentLetterIndex = (remaining - 1) % 26;
        result = String.fromCharCode(A_CHARCODE + currentLetterIndex) + result
        remaining = Math.floor((remaining - 1) / 26);
    }

    return result;
}

export const indexesToSpreadsheetRange = (
    worksheetName: string,
    colStart: number,
    rowStart: number,
    colEnd: number | undefined = undefined,
    rowEnd: number | undefined = undefined,
): string => {
    const start = `${indexToSpreadsheetLetter(colStart)}${rowStart + 1}`;

    if (colEnd !== undefined && rowEnd !== undefined) {
        const end = `${indexToSpreadsheetLetter(colEnd)}${rowEnd + 1}`;
        return `${worksheetName}!${start}:${end}`;
    }

    return `${worksheetName}!${start}`;
}
