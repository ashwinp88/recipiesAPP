import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent],
  imports: [
    CommonModule
  ]
})
export class RecipiesModule { }
