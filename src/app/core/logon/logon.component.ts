import { Component, OnInit, OnDestroy } from '@angular/core';

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidatorFunctions } from 'src/app/shared/form-validator-functions.provider';
import { Subscription } from 'rxjs';
/* import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; */

import { MatDialog } from '@angular/material';
/* import { ModalOkCancelComponent } from '../modal-ok-cancel/modal-ok-cancel.component'; */
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit, OnDestroy {

  faUser = faUser;
  faLock = faLock;
  formValidators = FormValidatorFunctions;
  errorMessage = 'Something went wrong!';

  private userValidatorSubscription: Subscription;

  logonForm: FormGroup;

  /* constructor(public authService: AuthService, public modalService: NgbModal, private router: Router) { } */
  constructor(public authService: AuthService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.logonForm = new FormGroup(
      {
        'usr': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'password': new FormControl({ value: '', disabled: true }, Validators.required),
      }
    );
    this.userValidatorSubscription = this.logonForm.get('usr').statusChanges.subscribe(
      (value) => {
        if (value === 'INVALID') {
          this.logonForm.get('password').disable();
        } else {
          this.logonForm.get('password').enable();
        }
      }
    );
  }

  ngOnDestroy() {
    this.userValidatorSubscription.unsubscribe();
  }

  onLogon(event) {
    /* console.log(event); */
    /* event.stopPropagation(); */
    this.authService.logon(this.logonForm.get('usr').value,
      this.logonForm.get('password').value).subscribe(
        (res: HttpResponse<any>) => {
          this.authService.uName = this.logonForm.get('usr').value;
          this.authService.authToken = res.body['access_token'];
          this.authService.isAuthorized = true;
          this.router.navigate(['/recipes']);
        },
        (errorValue: HttpErrorResponse) => {
          if (errorValue['error']) {
            if (errorValue['error']['error_description']) {
              this.errorMessage = errorValue['error']['error_description'];
            }
          } else {
            this.errorMessage = errorValue['message'];
          }
          this.openErrorModal();
        }
      );
  }

  openErrorModal() {
    const dialogRef = this.dialog.open( DialogComponent, { data: {
      Title: 'Error logging in',
      Body: this.errorMessage,
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
    /* modalRef.componentInstance.modalTitle = 'Error Logging in';
    modalRef.componentInstance.modalContent = this.errorMessage;
    modalRef.componentInstance.modalBtnCancelVisible = false; */
  }
}
