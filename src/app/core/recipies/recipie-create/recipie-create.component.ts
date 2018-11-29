import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { UnitOfMeasurementService } from '../services/unit-of-measurement.service';
import { Recipe, RecipeIngredient } from '../models/recipe.model';
import { AuthService } from 'src/app/shared/auth-service.service';
import { DataService } from 'src/app/shared/data.service';
import { Subject } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { faPlus, faArrowRight, faSave } from '@fortawesome/free-solid-svg-icons';
import { FormValidatorFunctions } from 'src/app/shared/form-validator-functions.provider';

@Component({
  selector: 'app-recipie-create',
  templateUrl: './recipie-create.component.html',
  styleUrls: ['./recipie-create.component.css']
})
export class RecipieCreateComponent implements OnInit {
  faPlus = faPlus;
  faArrowRight = faArrowRight;
  faSave = faSave;
  recipe: Recipe;
  imageLocation: string;
  linear = true;
  recipeForm: FormGroup;
  ingredientsForm: FormGroup;
  ingredientDeleted: Subject<RecipeIngredient>;
  formValidators = FormValidatorFunctions;

  constructor(
    private ingredientService: IngredientService,
    private unitOfMeasureService: UnitOfMeasurementService,
    private authService: AuthService,
    private dataService: DataService
    ) {
  }

  ngOnInit() {
    this.imageLocation = '';
    // this.ingredients = [];
    this.recipeForm = new FormGroup (
      {
        'title': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'img': new FormControl('')
      }
    );
    this.recipeForm.controls['img'].valueChanges.subscribe(
      (value: string) => this.imageLocation = value
    );
    this.ingredientsForm = new FormGroup (
      {
        'children': new FormArray([])
      }
    );
    this.ingredientDeleted = new Subject<RecipeIngredient>();
    this.ingredientDeleted.subscribe(
      (ing: RecipeIngredient) => {
        const controls = (<FormArray>this.ingredientsForm.controls['children']).controls;
        const index = controls.findIndex(c => c.value === ing);
        if (index !== -1) {
          controls.splice(index, 1);
        }
      }
    );
  }

  onStep1Submit() {
    if (this.recipeForm.valid) {
      this.recipe = new Recipe(
        this.recipeForm.controls['title'].value,
        this.recipeForm.controls['description'].value,
        this.authService.uID,
        false
      );
    }
  }

  onStep2Submit() {
    console.log(this.ingredientsForm);
  }

  onAddIngredient() {
    const newIngredient = new FormControl(new RecipeIngredient(this.recipe, null, null, 0), this.formValidators.isValidRecipeIngredient);
    (<FormArray>this.ingredientsForm.controls['children']).push(newIngredient);
  }

  onStepperChange(val: StepperSelectionEvent) {
    if (val.previouslySelectedIndex === 0) {
      this.onStep1Submit();
    }
    if (val.previouslySelectedIndex === 1) {
      this.onStep2Submit();
    }
  }

}
