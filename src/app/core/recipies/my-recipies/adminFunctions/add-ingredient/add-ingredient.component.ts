import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ingredient, IngredientResponse } from '../../../models/ingredient.model';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  @ViewChild('addIngredient') ingredientForm: NgForm;
  @ViewChild('searchIngredients') searchForm: NgForm;
  @ViewChild('paginator') paginator: MatPaginator;

  ingredientDeleted: Subject<Ingredient>;
  faSearch = faSearch;
  faPlus = faPlus;

  private snackBarRef: MatSnackBarRef<any>;
  pageEvent: PageEvent;
  length: number;
  resetPaginator = true;

  ingredientSearchResults: IngredientResponse;

  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ingredientSearchResults = new IngredientResponse([], 0);

    this.pageEvent = new PageEvent();
    this.pageEvent.pageSize = 5;
    this.pageEvent.pageIndex = 0;

    this.ingredientDeleted = new Subject<Ingredient>();
    this.ingredientDeleted.subscribe(
      (deletedIngredient: Ingredient) => {
        const index = this.ingredientSearchResults.Ingredients.indexOf(deletedIngredient);
        if (index !== -1) {
          this.ingredientSearchResults.Ingredients.splice(index, 1);
          this.ingredientSearchResults.Length = this.ingredientSearchResults.Length - 1;
          this.openSnackBar( 'Deleted record.',
          'Dismiss');
        }
      }
    );
  }

  onAddIngredient() {
    if (this.ingredientForm.valid) {
      const ingredient = this.ingredientForm.controls['ingredient'].value;
      this.dataService.addIngredient(ingredient).subscribe(
        (val) => {
          if (this.snackBarRef != null) {
            this.snackBarRef.dismiss();
          }
          this.openSnackBar( `Added ingredient ${val['Description']}. Record ID returned is ${val['ID']}`,
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
      this.ingredientForm.controls['ingredient'].markAsTouched();
    }
  }

  openSnackBar(content: string, action: string) {
    this.snackBarRef = this.snackBar.open(content, action, { duration: 1000 * 5 });
  }

  onSearchIngredients() {
    if (this.searchForm.valid) {
      this.length = 0;
      if (this.resetPaginator && this.paginator != null) {
        this.paginator.length = 0;
        this.paginator.pageIndex = 0;
      }
      const ingredient = this.searchForm.controls['searchIngredient'].value;
      if (ingredient === '*') {
        this.dataService.getAllIngredients(this.pageEvent.pageSize.toString(), this.pageEvent.pageIndex.toString()).subscribe(
          (resp: HttpResponse<IngredientResponse>) => {
           this.length = +resp.body.Length;
           this.ingredientSearchResults = resp.body;
          }
        );
      } else {
        this.dataService.getIngredientsByName(
          ingredient,
          this.pageEvent.pageSize.toString(),
          this.pageEvent.pageIndex.toString()).subscribe(
          (resp: HttpResponse<IngredientResponse>) => {
            this.length = +resp.body.Length;
            this.ingredientSearchResults = resp.body;
          }
        );
      }
    } else {
      this.searchForm.controls['searchIngredient'].markAsTouched();
    }
  }

  pageChanged(_pageEvent: PageEvent) {
    this.resetPaginator = false;
    this.pageEvent = _pageEvent;
    this.onSearchIngredients();
    this.resetPaginator = true;
  }
}
