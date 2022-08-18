export interface CarParkList {
    api_info: {
        status: string
    },
    items: CarPark[]
}

export interface CarPark {
    timestamp: string,
    carpark_data: CarParkInfo[]
}

export interface CarParkInfo {
    total_lots: string,
    lot_type: string,
    lots_available: string
}
