import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UnitOfMeasurement, UnitOfMeasurementResponse } from '../models/unit-of-measurement.model';
import { DataService } from 'src/app/shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasurementService {
  public UnitOfMeasurements: Observable<UnitOfMeasurement[]>;

  constructor(private dataService: DataService) {
    this.UnitOfMeasurements = this.dataService.getAllUOMNoPaging().pipe(
      map(res => (<UnitOfMeasurementResponse>res.body).UnitsOfMeasurements)
    );
  }
}
