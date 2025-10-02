import { BoxTariff } from "#core/types/box_tariffs.js";

export interface IBoxTariffsDB {
    saveTariffs(date: Date, tariffs: Array<BoxTariff>): Promise<void>,
    tariffsByDate(date: Date): Promise<Array<BoxTariff>>,
}
