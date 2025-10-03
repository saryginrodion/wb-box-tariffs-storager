import { IBoxTariffsSheet } from "#core/interfaces/box_tariffs_sheet.js";
import { BoxTariff } from "#core/types/box_tariffs.js";
import { newLogger } from "#utils/logging.js";
import { indexesToSpreadsheetRange } from "#utils/spreadsheets.js";
import { sheets_v4 } from "googleapis";

const logger = newLogger({
    from: "box_tariffs_sheet/service.ts",
})

export class BoxTariffsSheet implements IBoxTariffsSheet {
    #sheetName: string = "stock_coeffs"
    #spreadsheetId: string
    #sheets: sheets_v4.Sheets

    constructor(sheets: sheets_v4.Sheets, spreadsheetId: string) {
        this.#spreadsheetId = spreadsheetId
        this.#sheets = sheets;
    }

    async updateSheet(date: Date, tariffs: Array<BoxTariff>): Promise<void> {
        const rows = [[date,
        ]];
    }

    async writeRows(fromCol: number, fromRow: number, rows: Array<Array<string>>) {
        const rowsWidth = Math.max(...rows.map((row, _) => row.length))
        const colsLength = rows.length;

        const toRow = fromRow + rowsWidth - 1;
        const toCol = fromCol + colsLength - 1;

        const range = indexesToSpreadsheetRange(this.#sheetName, fromCol, fromRow, toCol, toRow);
        logger.debug("Writing range " + range);

        await this.#sheets.spreadsheets.values.update({
            spreadsheetId: this.#spreadsheetId,
            range: range,
            valueInputOption: "RAW",
            requestBody: {
                values: rows,
            }
        })
    }
}
