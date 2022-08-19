export interface carParkListLTA {
    value: carParkInfoLTA[]
}

export interface carParkInfoLTA {
    CarParkID: string,
    Area: string,
    Development: string,
    Location: string,
    AvailableLots: number,
    LotType: string,
    Agency: string
}