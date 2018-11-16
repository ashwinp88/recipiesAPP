import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipiesComponent } from './recipies.component';
import { RecipieCreateComponent } from './recipie-create/recipie-create.component';
import { RecipiesSearchComponent } from './recipies-search/recipies-search.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [
  { path: 'recipies', component: RecipiesComponent, children: [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: RecipiesSearchComponent },
    { path: 'new', canActivate: [AuthGuard], component: RecipieCreateComponent }
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipiesRoutingModule { }
