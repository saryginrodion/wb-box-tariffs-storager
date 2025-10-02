import { IBoxTariffsDB } from "#core/interfaces/box_tariffs_db.js";
import { BoxTariff } from "#core/types/box_tariffs.js";
import { toWbApiDateFormat } from "#utils/date.js";
import { Knex } from "knex";

export class BoxTariffsDB implements IBoxTariffsDB {
    #knex: Knex<BoxTariff>
    #table = "boxTariffs"

    constructor(knex: Knex) {
        this.#knex = knex
    }

    async saveTariffs(date: Date, tariffs: Array<BoxTariff>): Promise<void> {
        await this.#knex
            .into(this.#table)
            .insert(tariffs.map((tariff, _) => ({
                date: toWbApiDateFormat(date),
                ...tariff
            })))
            .onConflict(["warehouseName", "date"])
            .merge();
    }

    async tariffsByDate(date: Date): Promise<Array<BoxTariff>> {
        return await this.#knex
            .select("*")
            .where("date", toWbApiDateFormat(date));
    }
}
