import env from "#config/env/env.js"
import { sheets } from "#config/google/google.js"
import { BoxTariffsDB } from "#infrastructure/box_tariffs_db/service.js"
import { BoxTariffsSheet } from "#infrastructure/box_tariffs_sheet/service.js"
import { WbApi } from "#infrastructure/wbapi/service.js"
import knex from "#postgres/knex.js"
import { BoxTariffsOrchestrator } from "#services/box_tariffs_orchestrator.js"
import { newLogger } from "#utils/logging.js"
import axios from "axios"

const logger = newLogger({
    from: "schedule/tasks.ts",
})

const boxTariffsOrchestrator = new BoxTariffsOrchestrator(
    new WbApi(
        env.WB_API_TOKEN,
        axios.create(),
    ),
    new BoxTariffsDB(knex),
    new BoxTariffsSheet(await sheets(), env.SPREADSHEET_ID),
);

export const updateTariffsBox = async () => {
    try {
        logger.info("Starting task: updateTariffsBox");
        await boxTariffsOrchestrator.updateBoxTariffs();
        logger.info("Task ended: updateTariffsBox");
    } catch (error: any) {
        logger.child({
            error: error.message,
            errorStack: error.stack,
            task: "updateTariffsBox",
        }).error("Task failed");
    }
}
