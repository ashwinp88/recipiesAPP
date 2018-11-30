export class UnitOfMeasurementModel {
    constructor(public ID: number, public Description: string, public Abbreviation: string) {
    }
 }

 export class UnitOfMeasurementResponse {
    constructor(public UnitsOfMeasurements: UnitOfMeasurementModel[], public Length: number ) {
    }
 }
