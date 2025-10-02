import { BoxTariffs } from "#core/types/box_tariffs.js"
import { FloatWithCommaOptional, newSchemaFromInterface } from "#utils/zod_schema.js"
import * as z from "zod"

export type ResponseWrapper<T> = {
    response: {
        data: BoxTariffs,
    }
}

export const BoxTariffsValidationSchema = newSchemaFromInterface<BoxTariffs>()(
    z.object({
        dtNextBox: z.string(),
        dtTillMax: z.string(),
        warehouseList: z.array(z.object({
            boxDeliveryBase: FloatWithCommaOptional,
            boxDeliveryCoefExpr: FloatWithCommaOptional,
            boxDeliveryLiter: FloatWithCommaOptional,
            boxDeliveryMarketplaceBase: FloatWithCommaOptional,
            boxDeliveryMarketplaceCoefExpr: FloatWithCommaOptional,
            boxDeliveryMarketplaceLiter: FloatWithCommaOptional,
            boxStorageBase: FloatWithCommaOptional,
            boxStorageCoefExpr: FloatWithCommaOptional,
            boxStorageLiter: FloatWithCommaOptional,
            geoName: z.string(),
            warehouseName: z.string(),
        })),
    })
)
