import { AxiosInstance } from "axios"
import { ResponseWrapper } from "./schemas.js"
import { BoxTarrifs } from "#core/types/tariffs_box.js"
import { toWbApiDateFormat } from "./utils.js"
import axiosRetry from "axios-retry"
import { newLogger } from "#utils/logging.js"

const logger = newLogger({
    from: "wbapi/service.ts",
})

export class WbApi {
    #axios: AxiosInstance
    #commonApiBase: string = "https://common-api.wildberries.ru/api/v1/"

    constructor(token: string, axiosInstance: AxiosInstance) {
        this.#axios = axiosInstance.create({
            headers: {
                "Authorization": token
            },
        });

        axiosRetry(this.#axios, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            onRetry: (retryCount, error, requestConfig) => {
                logger.child({
                    url: requestConfig.url,
                    error,
                    retryCount
                }).warn("Retrying WBAPI call...");
            }
        })
    }

    async tariffsBox(date: Date): Promise<BoxTarrifs | undefined> {
        const response = await this.#axios.get<ResponseWrapper<BoxTarrifs>>(
            this.#commonApiBase + "tariffs/box",
            {
                params: {
                    date: toWbApiDateFormat(date),
                },
            },
        );

        return response.data.response.data;
    }
}
