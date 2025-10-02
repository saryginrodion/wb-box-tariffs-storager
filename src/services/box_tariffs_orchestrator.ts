import { IBoxTariffsDB } from "#core/interfaces/box_tariffs_db.js";
import { IBoxTariffsSheet } from "#core/interfaces/box_tariffs_sheet.js";
import { IWbApi } from "#core/interfaces/wbapi.js";

export class BoxTariffsOrchestrator {
    #wbapi: IWbApi
    #boxTariffsDb: IBoxTariffsDB
    #boxTariffsSheet: IBoxTariffsSheet

    constructor(wbapi: IWbApi, boxTariffsDb: IBoxTariffsDB, boxTariffsSheet: IBoxTariffsSheet) {
        this.#wbapi = wbapi;
        this.#boxTariffsDb = boxTariffsDb;
        this.#boxTariffsSheet = boxTariffsSheet;
    }

    async updateBoxTariffs(): Promise<void> {
        const date = new Date();

        const boxTariffs = await this.#wbapi.boxTariffs(date);

        await this.#boxTariffsDb.saveTariffs(date, boxTariffs.warehouseList);

        await this.#boxTariffsSheet.updateSheet(date, boxTariffs.warehouseList);
    }
}
