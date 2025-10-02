import { AxiosInstance } from "axios"
import { BoxTariffsValidationSchema, ResponseWrapper } from "./schemas.js"
import { BoxTariffs } from "#core/types/box_tariffs.js"
import axiosRetry from "axios-retry"
import { newLogger } from "#utils/logging.js"
import { IWbApi } from "#core/interfaces/wbapi.js"
import { toWbApiDateFormat } from "#utils/date.js"

const logger = newLogger({
    from: "wbapi/service.ts",
})

export class WbApi implements IWbApi {
    #axios: AxiosInstance
    #commonApiBase: string = "https://common-api.wildberries.ru/api/v1/"

    constructor(token: string, axiosInstance: AxiosInstance) {
        this.#axios = axiosInstance.create({
            timeout: 5000,
            headers: {
                "Authorization": token
            },
        });

        axiosRetry(this.#axios, {
            retries: 3,
            retryDelay: () => 3000.0,
            retryCondition: async (error) => {
                if (error.status == 401) {
                    logger.error("401 Authorization failed")
                    return false;
                }
                return true;
            },
            onRetry: (retryCount, error, requestConfig) => {
                logger.child({
                    url: requestConfig.url,
                    error: error.message,
                    retryCount,
                }).warn("Retrying WBAPI call...");
            }
        })
    }

    async boxTariffs(date: Date): Promise<BoxTariffs> {
        const response = await this.#axios.get<ResponseWrapper<BoxTariffs>>(
            this.#commonApiBase + "tariffs/box",
            {
                params: {
                    date: toWbApiDateFormat(date),
                },
            },
        );

        return BoxTariffsValidationSchema.parse(response.data.response.data);
    }
}
