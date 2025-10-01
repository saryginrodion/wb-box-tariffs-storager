import { BoxTarrifs } from "#core/types/tariffs_box.js"

export type ResponseWrapper<T> = {
    response: {
        data: BoxTarrifs,
    }
}
