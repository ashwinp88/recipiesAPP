import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  @ViewChild('addIngredient') ingredientForm: NgForm;
  @ViewChild('searchIngredients') searchForm: NgForm;

  faSearch = faSearch;
  faPlus = faPlus;

  alertVisible = false;
  alertText = '';
  alertType = '';

  // State management variables
  private successTimer;
  private failureTimer;

  ingredientSearchResults: {id: number, description: string}[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
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
        (map(res =>  res as {'id': number, 'description': string}[])).
        subscribe(
          (val) => {
            this.ingredientSearchResults = val;
          }
        );
     /*  this.ingredientSearchResults$.subscribe(
        (obj) => console.log(obj)
      ); */
     /*  this.dataService.getIngredientsByName(ingredient).subscribe(
        (val) => {
          this.ingredientSearchResults.push(val);
        },
        (val) => console.log(val)
      ); */
    }
  }

  closeAlert() {
    this.alertText = '';
    this.alertType = '';
    this.alertVisible = false;
  }

}
