import { BoxTarrifs } from "#core/types/box_tariffs.js";

export interface IWbApi {
    boxTariffs(date: string): Promise<BoxTarrifs>,
}
