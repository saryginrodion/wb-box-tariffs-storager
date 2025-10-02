import { IBoxTariffsDB } from "#core/interfaces/box_tariffs_db.js";
import { IBoxTariffsSheet } from "#core/interfaces/box_tariffs_sheet.js";
import { IWbApi } from "#core/interfaces/wbapi.js";
import { newLogger } from "#utils/logging.js";

const logger = newLogger({
    from: "box_tariffs_orchestrator.ts"
})

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
        logger.child({
            tariffsCount: boxTariffs.warehouseList.length
        }).debug("Loaded box tariffs from API")

        await this.#boxTariffsDb.saveTariffs(date, boxTariffs.warehouseList);
        logger.debug("Saved box tariffs to DB")

        await this.#boxTariffsSheet.updateSheet(date, boxTariffs.warehouseList);
        logger.debug("Updated box tariffs sheet")
    }
}
