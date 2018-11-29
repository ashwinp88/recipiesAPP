import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { UnitOfMeasurementService } from '../services/unit-of-measurement.service';
import { Ingredient } from '../models/ingredient.model';
import { UnitOfMeasurement } from '../models/unit-of-measurement.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RecipeIngredient } from '../models/recipe.model';

@Component({
  selector: 'app-recipie-ingredient',
  templateUrl: './recipie-ingredient.component.html',
  styleUrls: ['./recipie-ingredient.component.css']
})
export class RecipieIngredientComponent implements OnInit {
  @Input() ingredientDeleted: Subject<RecipeIngredient>;
  @Input() recipeIngredient: RecipeIngredient;
  faTimes = faTimes;
  ingredientForm: FormGroup;
  filteredIngredients: Observable<Ingredient[]>;
  filteredMeasurements: Observable<UnitOfMeasurement[]>;

  constructor(public ingredientService: IngredientService, public unitsOfMeasurementService: UnitOfMeasurementService) { }

  ngOnInit() {
    this.filteredIngredients = new Observable<Ingredient[]>();
    this.filteredMeasurements = new Observable<UnitOfMeasurement[]>();
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
            )));
        this.filteredIngredients.pipe(
          map(ingredients =>
            ingredients[0] == null ?
            new Ingredient(0, this.ingredientForm.controls['ingredient'].value) :
            ingredients[0])).subscribe(val => this.recipeIngredient.Ingredient_ = val);
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
        this.filteredMeasurements.pipe(
          map(measures =>
            measures[0] == null ?
            new UnitOfMeasurement
                (0,
                 this.ingredientForm.controls['measurement'].value,
                 this.ingredientForm.controls['measurement'].value
                 ) :  measures[0])).subscribe(val => this.recipeIngredient.UnitOfMeasure_ = val);
      }
    );
  }

  onRemove() {
    this.ingredientDeleted.next(this.recipeIngredient);
  }
}
