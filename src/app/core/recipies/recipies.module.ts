import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ]
})
export class RecipiesModule { }
