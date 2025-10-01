import { TariffsBox } from "#core/types/tariffs_box.js"

export type ResponseWrapper<T> = {
    response: {
        data: T,
    }
}

export type TariffsBoxData = {
    dtNextBox: string,
    dtTillMax: string,
    warehouseList: Array<TariffsBox>,
}
