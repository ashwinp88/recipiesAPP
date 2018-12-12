import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeModel, RecipeIngredient, RecipeStep, RecipeImageModel, CreateRecipeModel } from '../models/recipe.model';
import { AuthService } from 'src/app/shared/auth-service.service';
import { DataService } from 'src/app/shared/data.service';
import { Subject, Subscription } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { faPlus, faArrowRight, faSave, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FormValidatorFunctions } from 'src/app/shared/form-validator-functions.provider';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingScreenComponent } from '../../loading-screen/loading-screen.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-recipie-create',
  templateUrl: './recipie-create.component.html',
  styleUrls: ['./recipie-create.component.css']
})

export class RecipieCreateComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faArrowRight = faArrowRight;
  faSave = faSave;
  faCamera = faCamera;
  recipe: RecipeModel;
  imageLocation: string;
  imageBlob: string;
  linear = true;
  recipeForm: FormGroup;
  ingredientsForm: FormGroup;
  stepsForm: FormGroup;
  ingredientDeleted: Subject<RecipeIngredient>;
  ingredientSubscription: Subscription;
  stepDeleted: Subject<RecipeStep>;
  stepSubscription: Subscription;
  formValidators = FormValidatorFunctions;
  loadingRef: MatDialogRef<any>;
  get stepsFormArray(): FormArray {
    return  <FormArray>this.stepsForm.controls['children'];
  }
  get ingredientsFormArray(): FormArray {
    return  <FormArray>this.ingredientsForm.controls['children'];
  }
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService
    ) {
  }

  ngOnInit() {
    this.imageLocation = '';
    this.imageBlob = '';
    this.recipeForm = new FormGroup (
      {
        'title': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'img': new FormControl('')
      }
    );
    this.recipeForm.controls['img'].valueChanges.subscribe(
      (value: string) => {
        this.imageBlob = '';
        this.imageLocation = value;
      }
    );
    this.ingredientsForm = new FormGroup (
      {
        'children': new FormArray([])
      }
    );
    this.ingredientDeleted = new Subject<RecipeIngredient>();
    this.ingredientSubscription = this.ingredientDeleted.subscribe(
      (ing: RecipeIngredient) => {
        const controls = (<FormArray>this.ingredientsForm.controls['children']).controls;
        const index = controls.findIndex(c => c.value === ing);
        if (index !== -1) {
          controls.splice(index, 1);
        }
      }
    );
    this.stepsForm = new FormGroup (
      {
        'children': new FormArray([])
      }
    );
    this.stepDeleted = new Subject<RecipeStep>();
    this.stepSubscription = this.stepDeleted.subscribe(
      (step: RecipeStep) => {
        const controls = (<FormArray>this.stepsForm.controls['children']).controls;
        const index = controls.findIndex(c => c.value === step);
        if (index !== -1) {
          controls.splice(index, 1);
        }
      }
    );
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
    this.stepSubscription.unsubscribe();
  }

  onStep1Submit() {
    if (this.recipeForm.valid) {
      this.recipe = new RecipeModel(
        this.recipeForm.controls['title'].value,
        this.recipeForm.controls['description'].value,
        this.authService.uID,
        false
      );
    }
  }

  onStep2Submit() {
  }

  onAddIngredient() {
    const newIngredient = new FormControl(new RecipeIngredient(this.recipe, null, null, 0), this.formValidators.isValidRecipeIngredient);
    (<FormArray>this.ingredientsForm.controls['children']).push(newIngredient);
  }

  onAddStep() {
    const newStep = new FormControl(new RecipeStep(
      this.recipe,
      (<FormArray>this.stepsForm.controls['children']).controls.length + 1,
      '', '', 0, 0));
      (<FormArray>this.stepsForm.controls['children']).push(newStep);
  }

  onStepperChange(val: StepperSelectionEvent) {
    if (val.previouslySelectedIndex === 0) {
      this.onStep1Submit();
    }
    if (val.previouslySelectedIndex === 1) {
      this.onStep2Submit();
    }
  }

  createRecipe() {
    if (this.recipeForm.valid && this.ingredientsForm.valid && this.stepsForm.valid) {
      const recipe = new RecipeModel(
        this.recipeForm.controls['title'].value,
        this.recipeForm.controls['description'].value,
        this.authService.uID,
        true);
      const recipeImage = new RecipeImageModel(0, 1, 0, this.imageLocation, this.imageBlob);
      const recipeIngredients = this.ingredientsForm.controls['children'].value;
      const recipeStep = this.stepsForm.controls['children'].value;
      const createRecipe = new CreateRecipeModel(recipe, recipeImage, recipeIngredients, recipeStep);
      // console.log(createRecipe);
      this.dataService.addRecipe(createRecipe).subscribe(
        (val) => this.openThankYouModal(),
        (val) => this.openErrorModal()
      );
      this.showLoading();
    }
  }

  showLoading() {
    this.loadingRef = this.dialog.open( LoadingScreenComponent );
  }

  closeLoading() {
    this.loadingRef.close();
  }

  openErrorModal(title?: string, body?: string) {
    this.closeLoading();
    this.dialog.open( DialogComponent, { data: {
      Title: title ? title : 'Error saving your awesome recipe',
      Body: body ? body : 'Something went wrong. Please try again in a moment.',
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
  }

  openThankYouModal() {
    this.closeLoading();
    const dialogRef = this.dialog.open( DialogComponent, { data: {
      Title: 'Uploaded your awesome recipe!',
      Body: 'Thank you for your contribution to the community.',
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
    dialogRef.afterClosed().subscribe(
      () => this.router.navigate(['/recipes']),
      () => this.router.navigate(['/recipes'])
    );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.ng2ImgMax.resizeImage(event.target.files[0], 500, 500).subscribe(
        (res) => {
          this.closeLoading();
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = (r: any) => {
            this.recipeForm.controls['img'].setValue('');
            this.imageBlob = r.target.result;
          };
        },
        (err) => {
          this.closeLoading();
          this.openErrorModal('Error!', 'There was an issue with the selected image. Please try again.');
        }
      );
      this.showLoading();
    }
  }
}
