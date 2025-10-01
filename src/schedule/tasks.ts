import env from "#config/env/env.js"
import { WbApi } from "#services/wbapi/service.js"
import { newLogger } from "#utils/logging.js"
import axios from "axios"

const logger = newLogger({
    from: "schedule/tasks.ts",
})

const wbapi = new WbApi(
    env.WB_API_TOKEN,
    axios.create(),
)

export const updateTariffsBox = () => {
    const asyncTask = async () => {
        let tariffsBox;
        try {
            tariffsBox = await wbapi.tariffsBox(new Date());
        } catch (error) {
            logger.child({
                error,
                task: "updateTariffsBox",
            });
        }
    };

    asyncTask();
}
