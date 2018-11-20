import { Component, OnInit, Input, Output } from '@angular/core';
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { Subject } from 'rxjs';

import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { UnitOfMeasurement } from '../../../models/unit-of-measurement.model';

@Component({
  selector: 'app-edit-unit-of-measure',
  templateUrl: './edit-unit-of-measure.component.html',
  styleUrls: ['./edit-unit-of-measure.component.css']
})
export class EditUnitOfMeasureComponent implements OnInit {
  faSync = faSync;
  faTimes = faTimes;
  @Input() unitOfMeasurement: UnitOfMeasurement;
  @Input() unitOfMeasurementDeleted: Subject<UnitOfMeasurement>;

  private snackBarRef: MatSnackBarRef<any>;

  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onUpdate() {
    if (this.snackBarRef != null) {
      this.snackBarRef.dismiss();
    }
    this.dataService.editUOM(this.unitOfMeasurement).subscribe(
      () => {
        this.snackBarRef = this.snackBar.open('Updated record.', 'Dismiss', { duration: 1000 * 5 });
      },
      (resp) => {
        if (resp.error['Message']) {
          this.snackBar.open(resp.error.Message, 'Dismiss', { duration: 1000 * 5 });
        } else {
          this.snackBarRef = this.snackBar.open('Something went wrong!', 'Dismiss', { duration: 1000 * 5 });
        }
      }
    );
  }

  onDelete() {
    if (this.snackBarRef != null) {
      this.snackBarRef.dismiss();
    }
    this.dataService.deleteUOM(this.unitOfMeasurement.ID).subscribe(
      () => this.unitOfMeasurementDeleted.next(this.unitOfMeasurement),
      () => {
        this.snackBarRef = this.snackBar.open('Something went wrong!', 'Dismiss', { duration: 1000 * 5 });
      }
    );
  }

}
