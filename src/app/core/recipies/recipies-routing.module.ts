import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipiesComponent } from './recipies.component';
import { RecipieCreateComponent } from './recipie-create/recipie-create.component';
import { RecipiesSearchComponent } from './recipies-search/recipies-search.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { MyRecipiesComponent } from './my-recipies/my-recipies.component';
import { AddIngredientComponent } from './my-recipies/adminFunctions/add-ingredient/add-ingredient.component';
import { AddUnitOfMeasureComponent } from './my-recipies/adminFunctions/add-unit-of-measure/add-unit-of-measure.component';
import { RecipeDetailItemComponent } from './recipe-detail-item/recipe-detail-item.component';

const routes: Routes = [
  { path: 'recipes', component: RecipiesComponent, children: [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: RecipiesSearchComponent },
    { path: 'search/:q', component: RecipiesSearchComponent },
    { path: 'new', component: RecipieCreateComponent },
    { path: 'myRecipes', canActivate: [AuthGuard], component: MyRecipiesComponent },
    { path: 'myRecipes/addIngredient', canActivate: [AuthGuard], component: AddIngredientComponent },
    { path: 'myRecipes/addUnitsOfMeasure', canActivate: [AuthGuard], component: AddUnitOfMeasureComponent }
    /* { path: 'myRecipes', canActivate: [AuthGuard], component: MyRecipiesComponent, children: [
      { path: 'addIngredient', component: AddIngredientComponent },
      { path: 'addUnitsOfMeasure', component: AddUnitOfMeasureComponent }
      // I don't know why child routes are not working
    ] } */
  ]},
  { path: 'recipes/:id', component: RecipeDetailItemComponent }
];

/* { path: 'new', canActivate: [AuthGuard], component: RecipieCreateComponent }, */

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipiesRoutingModule { }
