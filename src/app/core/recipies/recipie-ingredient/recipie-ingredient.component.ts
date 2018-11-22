import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { UnitOfMeasurementService } from '../services/unit-of-measurement.service';
import { Ingredient } from '../models/ingredient.model';
import { UnitOfMeasurement } from '../models/unit-of-measurement.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-recipie-ingredient',
  templateUrl: './recipie-ingredient.component.html',
  styleUrls: ['./recipie-ingredient.component.css']
})
export class RecipieIngredientComponent implements OnInit {

  ingredientForm: FormGroup;
  filteredIngredients: Observable<Ingredient[]>;
  filteredMeasurements: Observable<UnitOfMeasurement[]>;

  constructor(public ingredientService: IngredientService, public unitsOfMeasurementService: UnitOfMeasurementService) { }

  ngOnInit() {
    this.ingredientForm = new FormGroup(
      {
        'ingredient': new FormControl('', Validators.required),
        'qty': new FormControl('', Validators.required),
        'measurement': new FormControl('', Validators.required)
      }
    );
    this.ingredientForm.controls['ingredient'].valueChanges.subscribe(
      () => {
        this.filteredIngredients = this.ingredientService.Ingredients.pipe(
         map(ingredients => ingredients
            .filter(
              ing => ing.Description.toLowerCase()
              .startsWith(this.ingredientForm.controls['ingredient'].value.toLowerCase())
              )
            )
          );
        }
      );
      this.ingredientForm.controls['measurement'].valueChanges.subscribe(
        () => {
          this.filteredMeasurements = this.unitsOfMeasurementService.UnitOfMeasurements.pipe(
           map(measurements => measurements
              .filter(
                m => m.Description.toLowerCase()
                .startsWith(this.ingredientForm.controls['measurement'].value.toLowerCase()) ||
                m.Abbreviation.toLowerCase()
                .startsWith(this.ingredientForm.controls['measurement'].value.toLowerCase())
                )
              )
            );
          }
        );
  }
}
