import { BoxTariff } from "#core/types/box_tariffs.js";

export interface IBoxTariffsSheet {
    updateSheet(date: string, tariffs: Array<BoxTariff>): Promise<void>,
}
