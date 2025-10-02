import { IBoxTariffsSheet } from "#core/interfaces/box_tariffs_sheet.js";
import { BoxTariff } from "#core/types/box_tariffs.js";

export class BoxTariffsSheet implements IBoxTariffsSheet {
    async updateSheet(date: string, tariffs: Array<BoxTariff>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
