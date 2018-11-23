import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { UnitOfMeasurementService } from '../services/unit-of-measurement.service';
import { Recipe, RecipeIngredient } from '../models/recipe.model';
import { AuthService } from 'src/app/shared/auth-service.service';
import { DataService } from 'src/app/shared/data.service';
import { Subject } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipie-create',
  templateUrl: './recipie-create.component.html',
  styleUrls: ['./recipie-create.component.css']
})
export class RecipieCreateComponent implements OnInit {
  faPlus = faPlus;
  faArrowRight = faArrowRight;
  recipe: Recipe;
  imageLocation: string;
  ingredients: RecipeIngredient[];
  linear = true;
  recipeForm: FormGroup;
  ingredientsForm: FormGroup;
  ingredientDeleted: Subject<RecipeIngredient>;

  constructor(
    private ingredientService: IngredientService,
    private unitOfMeasureService: UnitOfMeasurementService,
    private authService: AuthService,
    private dataService: DataService
    ) {
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
  }

  ngOnInit() {
    this.imageLocation = '';
    this.ingredients = [];
    this.ingredientDeleted = new Subject<RecipeIngredient>();
    this.ingredientDeleted.subscribe(
      (ing: RecipeIngredient) => {
        const index = this.ingredients.indexOf(ing);
        if (index !== -1) {
          this.ingredients.splice(index, 1);
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
       console.log('submitting');
    }
  }

  onStep2Submit() {
    console.log(this.ingredients);
  }

  onAddIngredient() {
    this.ingredients.push(new RecipeIngredient(this.recipe, null, null, 0));
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
