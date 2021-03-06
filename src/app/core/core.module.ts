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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../shared/auth-service.service';
import { ModalOkCancelComponent } from './modal-ok-cancel/modal-ok-cancel.component';
import { RecipiesModule } from './recipies/recipies.module';
import { AuthGuard } from '../shared/auth.guard';
import { DataService } from '../shared/data.service';
import { DialogComponent } from './dialog/dialog.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  declarations: [
    SignupComponent,
    LogonComponent,
    HeaderComponent,
    ModalOkCancelComponent,
    DialogComponent,
    LoadingScreenComponent
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
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent, SignupComponent, LogonComponent, NgbModule, MatBadgeModule
  ],
  providers: [NgbActiveModal],
  entryComponents: [ModalOkCancelComponent, DialogComponent, LoadingScreenComponent]
})
export class CoreModule { }
