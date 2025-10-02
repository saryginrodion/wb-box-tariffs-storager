import { BoxTariffs } from "#core/types/box_tariffs.js";

export interface IWbApi {
    boxTariffs(date: Date): Promise<BoxTariffs>,
}
