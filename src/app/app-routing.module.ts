import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from './core/logon/logon.component';
import { SignupComponent } from './core/signup/signup.component';
import { RecipiesComponent } from './core/recipies/recipies.component';

const routes: Routes = [
  { path: '', redirectTo: '\logon', pathMatch: 'full' },
  { path: 'logon', component: LogonComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
