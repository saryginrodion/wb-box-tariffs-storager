export interface BoxTariff {
    boxDeliveryBase?: number,
    boxDeliveryCoefExpr?: number,
    boxDeliveryLiter?: number,
    boxDeliveryMarketplaceBase?: number,
    boxDeliveryMarketplaceCoefExpr?: number,
    boxDeliveryMarketplaceLiter?: number,
    boxStorageBase?: number,
    boxStorageCoefExpr?: number,
    boxStorageLiter?: number,
    geoName: string,
    warehouseName: string,
}

export interface BoxTariffs {
    dtNextBox: string,
    dtTillMax: string,
    warehouseList: Array<BoxTariff>,
}
