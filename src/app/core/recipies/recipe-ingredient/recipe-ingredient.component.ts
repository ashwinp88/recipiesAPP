import { Component, OnInit, ViewChild, forwardRef, OnDestroy, Input } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { UnitOfMeasurementService } from '../services/unit-of-measurement.service';
import { IngredientModel } from '../models/ingredient.model';
import { UnitOfMeasurementModel } from '../models/unit-of-measurement.model';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RecipeIngredient } from '../models/recipe.model';



@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RecipeIngredientComponent),
    }
  ]
})

export class RecipeIngredientComponent implements
OnInit, ControlValueAccessor, OnDestroy {

  @Input() ingredientDeleted: Subject<RecipeIngredient>;
  recipeIngredient: RecipeIngredient;
  @ViewChild('ingredient') ingredientForm: NgForm;
  faTimes = faTimes;
  filteredIngredients: Observable<IngredientModel[]>;
  filteredMeasurements: Observable<UnitOfMeasurementModel[]>;
  ingredientValueChangeSubscription: Subscription;
  measurementValueChangeSubscription: Subscription;
  qtyChangeSubscription: Subscription;
  onChange: (_: any) => {};
  onTouch: () => {};

  constructor(public ingredientService: IngredientService, public unitsOfMeasurementService: UnitOfMeasurementService) { }


  writeValue(value: RecipeIngredient): void {
    this.recipeIngredient = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {
    this.filteredIngredients = new Observable<IngredientModel[]>();
    this.filteredMeasurements = new Observable<UnitOfMeasurementModel[]>();
    setTimeout( this.addSubscriptions.bind(this), 0);
  }

  ngOnDestroy(): void {
   this.removeSubscription();
  }

  onRemove() {
    this.ingredientDeleted.next(this.recipeIngredient);
  }

  addSubscriptions() {
    this.ingredientValueChangeSubscription = this.ingredientForm.controls['ingredient'].valueChanges.subscribe(
      (value: string) => {
        this.filteredIngredients = this.ingredientService.Ingredients.pipe(
          map(ingredients => ingredients
            .filter(
              ing => ing.Description.toLowerCase()
                .startsWith(value.toLowerCase())
            )));
        this.filteredIngredients.pipe(
          map(ingredients =>
              (ingredients.length > 0 && value.toLowerCase() === ingredients[0].Description.toLowerCase()) ?
              ingredients[0] : new IngredientModel(0, value)
             )).subscribe(val => {
               this.recipeIngredient.Ingredient = val;
               this.onChange(this.recipeIngredient);
             });
      }
    );
    this.measurementValueChangeSubscription = this.ingredientForm.controls['measurement'].valueChanges.subscribe(
      (value) => {
        this.filteredMeasurements = this.unitsOfMeasurementService.UnitOfMeasurements.pipe(
          map(measurements => measurements
            .filter(
              m => m.Description.toLowerCase()
                .startsWith(value.toLowerCase()) ||
                m.Abbreviation.toLowerCase()
                  .startsWith(value.toLowerCase())
            )
          )
        );
        this.filteredMeasurements.pipe(
          map(measures =>
              (measures.length > 0 && value.toLowerCase() === measures[0].Description.toLowerCase()) ?
              measures[0] : new UnitOfMeasurementModel(0, value, value)
             )).subscribe(val => {
               this.recipeIngredient.UnitsOfMeasurement = val;
               this.onChange(this.recipeIngredient);
             });
      }
    );
    this.qtyChangeSubscription = this.ingredientForm.controls['qty'].valueChanges.subscribe(
      (val: number) => this.recipeIngredient.Quantity = val
    );
  }

  removeSubscription() {
    this.ingredientValueChangeSubscription.unsubscribe();
    this.measurementValueChangeSubscription.unsubscribe();
    this.qtyChangeSubscription.unsubscribe();
  }
}
