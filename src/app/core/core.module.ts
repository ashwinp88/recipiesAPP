import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LogonComponent } from './logon/logon.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../shared/auth-service.service';
import { ModalOkCancelComponent } from './modal-ok-cancel/modal-ok-cancel.component';
import { RecipiesModule } from './recipies/recipies.module';
import { AuthGuard } from '../shared/auth.guard';
import { DataService } from '../shared/data.service';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    SignupComponent,
    LogonComponent,
    HeaderComponent,
    ModalOkCancelComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    RecipiesModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent, SignupComponent, LogonComponent, NgbModule
  ],
  providers: [AuthService, NgbActiveModal, AuthGuard, DataService],
  entryComponents: [ModalOkCancelComponent, DialogComponent]
})
export class CoreModule { }
