import { BoxTariff } from "#core/types/box_tariffs.js";

export interface IBoxTariffsDB {
    saveTariffs(date: string, tariffs: Array<BoxTariff>): Promise<void>,
    tariffsByDate(date: string): Promise<Array<BoxTariff>>,
}
