import { IBoxTariffsSheet } from "#core/interfaces/box_tariffs_sheet.js";
import { BoxTariff } from "#core/types/box_tariffs.js";
import { toWbApiDateFormat } from "#utils/date.js";
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
        await this.clearSheet();

        // Headings
        const rows = [[
            "Дата",
            "Имя склада",
            "Геолокация",
            "Базовая стоимость доставки",
            "Коэф. доставки (экспресс)",
            "Стоимость доставки за литр",
            "Базовая стоимость доставки (Маркетплейс)",
            "Коэф. экспресс доставки (Маркетплейс)",
            "Стоимость доставки за литр (Маркетплейс)",
            "Базовая стоимость хранения",
            "Коэф. стоимости хранения (экспресс)",
            "Стоимость хранения за литр",
        ]];

        await this.writeRows(0, 0, rows);

        const tariffRows = tariffs.sort((a, b) => {
            // Сортировка только по коэф. экспресс доставки
            return (a.boxDeliveryCoefExpr || 0) - (b.boxDeliveryCoefExpr || 0);
        }).map((tariff, _) => [
            toWbApiDateFormat(date),
            tariff.warehouseName,
            tariff.geoName,
            tariff.boxDeliveryBase,
            tariff.boxDeliveryCoefExpr,
            tariff.boxDeliveryLiter,
            tariff.boxDeliveryMarketplaceBase,
            tariff.boxDeliveryMarketplaceCoefExpr,
            tariff.boxDeliveryMarketplaceLiter,
            tariff.boxStorageBase,
            tariff.boxStorageCoefExpr,
            tariff.boxStorageLiter,
        ]);

        await this.writeRows(0, 1, tariffRows);
    }

    async clearSheet() {
        await this.#sheets.spreadsheets.values.clear({
            spreadsheetId: this.#spreadsheetId,
            range: this.#sheetName,
        });
        logger.debug("Cleared sheet");
    }

    async writeRows(fromCol: number, fromRow: number, rows: Array<Array<string | number | null | undefined>>) {
        const rowsWidth = Math.max(...rows.map((row, _) => row.length))
        const colsLength = rows.length;

        const toRow = fromRow + colsLength - 1;
        const toCol = fromCol + rowsWidth - 1;

        const range = indexesToSpreadsheetRange(this.#sheetName, fromCol, fromRow, toCol, toRow);

        await this.#sheets.spreadsheets.values.update({
            spreadsheetId: this.#spreadsheetId,
            range: range,
            valueInputOption: "RAW",
            requestBody: {
                values: rows,
            }
        });

        logger.debug("Wrote range: " + range);
    }
}
