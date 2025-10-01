import { AxiosInstance } from "axios"
import { ResponseWrapper, TariffsBoxData } from "./schemas.js"
import { TariffsBox } from "#core/types/tariffs_box.js"
import { toWbApiDateFormat } from "./utils.js"

export class WbApi {
    #axios: AxiosInstance
    #commonApiBase: string = "https://common-api.wildberries.ru/api/v1/"

    constructor(token: string, axiosInstance: AxiosInstance) {
        this.#axios = axiosInstance.create({
            headers: {
                "Authorization": token
            },
        });
    }

    async tariffsBox(date: Date): Promise<Array<TariffsBox> | undefined> {
        const response = await this.#axios.get<ResponseWrapper<TariffsBoxData>>(
            this.#commonApiBase + "tariffs/box",
            {
                params: toWbApiDateFormat(date),
            },
        );

        return undefined;
    }
}
