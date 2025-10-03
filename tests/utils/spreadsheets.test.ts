import { indexToSpreadsheetLetter, indexesToSpreadsheetRange } from "../../src/utils/spreadsheets.ts";
import { test, expect } from "vitest";


test("indexToSpreadsheetLetter 0", () => {
    expect(indexToSpreadsheetLetter(0)).toBe("A");
});

test("indexToSpreadsheetLetter 26", () => {
    expect(indexToSpreadsheetLetter(26)).toBe("AA");
});

test("indexToSpreadsheetLetter 25", () => {
    expect(indexToSpreadsheetLetter(25)).toBe("Z");
});


test("indexesToSpreadsheetRange list 0 0 0 0", () => {
    expect(indexesToSpreadsheetRange("list", 0, 0, 0, 0)).toBe("list!A1:A1");
});

test("indexesToSpreadsheetRange TEST 25 4 26 42", () => {
    expect(indexesToSpreadsheetRange("TEST", 25, 4, 26, 42)).toBe("TEST!Z5:AA43");
});
