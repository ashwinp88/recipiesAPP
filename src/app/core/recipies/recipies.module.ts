import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipieCreateComponent } from './recipie-create/recipie-create.component';
import { RecipiesRoutingModule } from './recipies-routing.module';
import { RecipiesSearchComponent } from './recipies-search/recipies-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecipieIngredientComponent } from './recipie-ingredient/recipie-ingredient.component';
import { RecipieStepComponent } from './recipie-step/recipie-step.component';
import { MyRecipiesComponent } from './my-recipies/my-recipies.component';
import { AddIngredientComponent } from './my-recipies/adminFunctions/add-ingredient/add-ingredient.component';
import { AddUnitOfMeasureComponent } from './my-recipies/adminFunctions/add-unit-of-measure/add-unit-of-measure.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditIngredientComponent } from './my-recipies/adminFunctions/edit-ingredient/edit-ingredient.component';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieCreateComponent,
    RecipiesSearchComponent,
    RecipieIngredientComponent,
    RecipieStepComponent,
    MyRecipiesComponent,
    AddIngredientComponent,
    AddUnitOfMeasureComponent,
    EditIngredientComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RecipiesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    NgbModule
  ]
})
export class RecipiesModule { }
