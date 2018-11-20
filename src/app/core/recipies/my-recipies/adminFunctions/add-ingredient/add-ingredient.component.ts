import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../../models/ingredient.model';




@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  @ViewChild('addIngredient') ingredientForm: NgForm;
  @ViewChild('searchIngredients') searchForm: NgForm;

  ingredientDeleted: Subject<Ingredient>;
  faSearch = faSearch;
  faPlus = faPlus;

  alertVisible = false;
  alertText = '';
  alertType = '';

  // State management variables
  private successTimer;
  private failureTimer;

  ingredientSearchResults: Ingredient[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.ingredientDeleted = new Subject<Ingredient>();
    this.ingredientDeleted.subscribe(
      (deletedIngredient: Ingredient) => {
        const index = this.ingredientSearchResults.indexOf(deletedIngredient);
        if (index !== -1) {
          this.ingredientSearchResults.splice(index, 1);
        }
      }
    );
  }

  onAddIngredient() {
    if (this.ingredientForm.valid) {
      const ingredient = this.ingredientForm.controls['ingredient'].value;
      this.dataService.addIngredient(ingredient).subscribe(
        (val) => {
          this.alertText = `Added ingredient ${val['Description']}. Record ID returned is ${val['ID']}`;
          this.alertType = 'success';
          this.alertVisible = true;
          if (this.successTimer != null) {
            clearTimeout(this.successTimer);
          }
          this.successTimer = setTimeout(this.resetAlert.bind(this), 1000 * 5);
        },
        (val) => {
          this.alertText = 'There was an issue inserting the record.';
          this.alertType = 'danger';
          this.alertVisible = true;
          if (this.failureTimer != null) {
            clearTimeout(this.failureTimer);
          }
          this.failureTimer = setTimeout(this.resetAlert.bind(this), 1000 * 5);
        }
      );
    } else {
      this.ingredientForm.controls['ingredient'].markAsTouched();
    }
  }

  resetAlert() {
    this.alertVisible = false;
    this.alertText = '';
    this.alertType = '';
  }

  onSearchIngredients() {
    if (this.searchForm.valid) {
      const ingredient = this.searchForm.controls['searchIngredient'].value;
      this.dataService.getIngredientsByName(ingredient)
        .pipe
        (map(res => res as Ingredient[])).
        subscribe(
          (val) => {
            this.ingredientSearchResults = val;
          }
        );
    } else {
      this.searchForm.controls['searchIngredient'].markAsTouched();
    }
  }

  closeAlert() {
    this.alertText = '';
    this.alertType = '';
    this.alertVisible = false;
  }

}
