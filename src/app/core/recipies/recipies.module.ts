import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipieCreateComponent } from './recipie-create/recipie-create.component';
import { RecipiesRoutingModule } from './recipies-routing.module';
import { RecipiesSearchComponent } from './recipies-search/recipies-search.component';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieCreateComponent,
    RecipiesSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    RecipiesRoutingModule
  ]
})
export class RecipiesModule { }
