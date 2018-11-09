import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LogonComponent } from './logon/logon.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../shared/auth-service.service';
import { ModalOkCancelComponent } from './modal-ok-cancel/modal-ok-cancel.component';
import { RecipiesModule } from './recipies/recipies.module';

@NgModule({
  declarations: [
    SignupComponent,
    LogonComponent,
    HeaderComponent,
    ModalOkCancelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    RecipiesModule
  ],
  exports: [
    HeaderComponent, SignupComponent, LogonComponent
  ],
  providers: [AuthService, NgbActiveModal],
  entryComponents: [ModalOkCancelComponent]
})
export class CoreModule { }
