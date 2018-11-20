import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { UnitOfMeasurement } from '../../../models/unit-of-measurement.model';


@Component({
  selector: 'app-add-unit-of-measure',
  templateUrl: './add-unit-of-measure.component.html',
  styleUrls: ['./add-unit-of-measure.component.css']
})
export class AddUnitOfMeasureComponent implements OnInit  {
  @ViewChild('addUnitOfMeasurement')unitOfMeasurementForm: NgForm;
  @ViewChild('searchUnitOfMeasurement') searchForm: NgForm;
  @ViewChild('paginator') paginator: MatPaginator;

  unitOfMeasurementDeleted: Subject<UnitOfMeasurement>;
  faSearch = faSearch;
  faPlus = faPlus;

  private snackBarRef: MatSnackBarRef<any>;
  pageEvent: PageEvent;
  length: number;
  resetPaginator = true;

  unitOfMeasurementSearchResults: UnitOfMeasurement[];

  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.unitOfMeasurementSearchResults = [];

    this.pageEvent = new PageEvent();
    this.pageEvent.pageSize = 5;
    this.pageEvent.pageIndex = 0;

    this.unitOfMeasurementDeleted = new Subject<UnitOfMeasurement>();
    this.unitOfMeasurementDeleted.subscribe(
      (deletedUnitofMeasurement: UnitOfMeasurement) => {
        const index = this.unitOfMeasurementSearchResults.indexOf(deletedUnitofMeasurement);
        if (index !== -1) {
          this.unitOfMeasurementSearchResults.splice(index, 1);
          this.openSnackBar( 'Deleted record.',
          'Dismiss');
        }
      }
    );
  }

  onAddUOM() {
    if (this.unitOfMeasurementForm.valid) {
      const description = this.unitOfMeasurementForm.controls['description'].value;
      const abbr = this.unitOfMeasurementForm.controls['abbreviation'].value;
      this.dataService.addUOM(description, abbr).subscribe(
        (val) => {
          if (this.snackBarRef != null) {
            this.snackBarRef.dismiss();
          }
          this.openSnackBar( `Added unit of measurement ${val['description']}. Record ID returned is ${val['ID']}`,
          'Dismiss');
        },
        (val) => {
          if (this.snackBarRef != null) {
            this.snackBarRef.dismiss();
          }
          if (val.error['Message']) {
            this.openSnackBar( val.error.Message,
            'Dismiss');
          } else {
            this.openSnackBar( 'There was an issue inserting the record.',
            'Dismiss');
          }
        }
      );
    } else {
      this.unitOfMeasurementForm.controls['description'].markAsTouched();
      this.unitOfMeasurementForm.controls['abbr'].markAsTouched();
    }
  }

  openSnackBar(content: string, action: string) {
    this.snackBarRef = this.snackBar.open(content, action, { duration: 1000 * 5 });
  }

  onSearchUOM() {
    if (this.searchForm.valid) {
      this.length = 0;
      if (this.resetPaginator && this.paginator != null) {
        this.paginator.length = 0;
        this.paginator.pageIndex = 0;
      }
      const description = this.searchForm.controls['description'].value;
      if (description === '*') {
        this.dataService.getAllUOM(this.pageEvent.pageSize.toString(), this.pageEvent.pageIndex.toString()).subscribe(
          (resp: HttpResponse<UnitOfMeasurement[]>) => {
           this.length = +resp.headers.get('recordCount');
           this.unitOfMeasurementSearchResults = resp.body as UnitOfMeasurement[];
          }
        );
      } else {
        this.dataService.getUOMByName(
          description,
          this.pageEvent.pageSize.toString(),
          this.pageEvent.pageIndex.toString()).subscribe(
          (resp: HttpResponse<UnitOfMeasurement[]>) => {
            this.length = +resp.headers.get('recordCount');
            this.unitOfMeasurementSearchResults = resp.body as UnitOfMeasurement[];
          }
        );
      }
    } else {
      this.searchForm.controls['searchdescription'].markAsTouched();
    }
  }

  pageChanged(_pageEvent: PageEvent) {
    this.resetPaginator = false;
    this.pageEvent = _pageEvent;
    this.onSearchUOM();
    this.resetPaginator = true;
  }
}
