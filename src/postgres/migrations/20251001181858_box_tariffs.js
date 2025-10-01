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
        table.float("boxDeliveryBase");
        table.float("boxDeliveryCoefExpr");
        table.float("boxDeliveryLiter");
        table.float("boxDeliveryMarketplaceBase");
        table.float("boxDeliveryMarketplaceCoefExpr");
        table.float("boxDeliveryMarketplaceLiter");
        table.float("boxStorageBase");
        table.float("boxStorageCoefExpr");
        table.float("boxStorageLiter");

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
