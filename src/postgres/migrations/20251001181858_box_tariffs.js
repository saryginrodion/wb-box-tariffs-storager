/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return await knex.schema.createTable("boxTariffs", (table) => {
        table.string("warehouseName");
        table.string("date");

        table.primary(["warehouseName", "date"]);

        table.string("geoName");
        table.float("boxDeliveryBase").nullable();
        table.float("boxDeliveryCoefExpr").nullable();
        table.float("boxDeliveryLiter").nullable();
        table.float("boxDeliveryMarketplaceBase").nullable();
        table.float("boxDeliveryMarketplaceCoefExpr").nullable();
        table.float("boxDeliveryMarketplaceLiter").nullable();
        table.float("boxStorageBase").nullable();
        table.float("boxStorageCoefExpr").nullable();
        table.float("boxStorageLiter").nullable();

        table.timestamps();
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return await knex.schema.dropTable("boxTariffs");
}
