import { IBoxTariffsDB } from "#core/interfaces/box_tariffs_db.js";
import { BoxTariff } from "#core/types/box_tariffs.js";
import { Knex } from "knex";

export class BoxTariffsDB implements IBoxTariffsDB {
    #knex: Knex<BoxTariff>
    #table = "boxTariffs"

    constructor(knex: Knex) {
        this.#knex = knex
    }

    async saveTariffs(date: string, tariffs: Array<BoxTariff>): Promise<void> {
        await this.#knex
            .into(this.#table)
            .insert(tariffs.map((tariff, _) => ({
                date,
                ...tariff
            })))
            .onConflict()
            .merge();
    }

    async tariffsByDate(date: string): Promise<Array<BoxTariff>> {
        return await this.#knex
            .select("*")
            .where("date", date);
    }
}
