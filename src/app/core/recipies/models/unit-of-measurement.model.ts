export class UnitOfMeasurement {
    constructor(public ID: number, public Description: string, public Abbreviation: string) {
    }
 }

 export class UnitOfMeasurementResponse {
    constructor(public UnitsOfMeasurements: UnitOfMeasurement[], public Length: number ) {
    }
 }
