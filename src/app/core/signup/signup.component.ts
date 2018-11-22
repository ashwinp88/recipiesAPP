import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { faUser, faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
/* import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; */
/* import { ModalOkCancelComponent } from '../modal-ok-cancel/modal-ok-cancel.component'; */
import { MatDialog } from '@angular/material';
import { FormValidatorFunctions } from 'src/app/shared/form-validator-functions.provider';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faLock = faLock;
  faUserLock = faUserLock;
  faEnvelopeOpen = faEnvelopeOpen;
  formValidators = FormValidatorFunctions;

  signingUp = false;
  signupForm: FormGroup;
  errorMessage = 'Something went wrong!';

  private emailValidatorSubscription: Subscription;
  private passwordValidatorSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    /* private modalService: NgbModal */
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        'usr': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl({ value: '', disabled: true },
                                    [Validators.required, Validators.minLength(6), this.formValidators.isValidPassword]),
        'confirmPassword': new FormControl( { value: '', disabled: true } )
      }
    );
    this.emailValidatorSubscription = this.signupForm.get('email').statusChanges.subscribe(
      (value) => {
        if (value === 'INVALID') {
          this.signupForm.get('password').disable();
        } else {
          this.signupForm.get('password').enable();
        }
      }
    );
    this.passwordValidatorSubscription = this.signupForm.get('password').statusChanges.subscribe(
      (value) => {
        if (value === 'INVALID') {
          this.signupForm.get('confirmPassword').disable();
        } else {
          this.signupForm.get('confirmPassword').enable();
          this.signupForm.get('confirmPassword').setValidators(this.isvalidConfirmPassword.bind(this));
          this.signupForm.get('confirmPassword').updateValueAndValidity();
          this.signupForm.updateValueAndValidity();
        }
      }
    );
  }

  ngOnDestroy() {
    this.emailValidatorSubscription.unsubscribe();
    this.passwordValidatorSubscription.unsubscribe();
  }

  onSignUp() {
    this.signingUp = true;
    this.authService.signup(this.signupForm.get('usr').value,
                            this.signupForm.get('email').value,
                            this.signupForm.get('password').value).subscribe(
      (value) => {},
      (errorValue: HttpErrorResponse) => {
        this.signingUp = false;
        this.errorMessage =  errorValue.error['Message'];
        this.openErrorModal();
      },
      () => {
        this.openSuccessModal();
     }
    );
  }

  isvalidConfirmPassword(control: FormControl): {[s: string]: boolean} {
    if (control.value === this.signupForm.get('password').value) {
      return null;
    }
    return {'passwordDoesNotMatch': true};
  }

  openSuccessModal() {
    const dialogRef = this.dialog.open(DialogComponent, { data: {
      Title: 'Registration Success!',
      Body: 'You will be taken to the login page.',
      OkBtnCaption: 'Take Me',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
    dialogRef.afterClosed().subscribe(
      () => this.router.navigate(['/logon']),
      () => this.router.navigate(['/logon'])
    );
   /*  modalRef.componentInstance.modalTitle = 'Registration Success!';
    modalRef.componentInstance.modalContent = 'You will be taken to the login page.';
    modalRef.componentInstance.modalOkBtnCaption = 'Take Me';
    modalRef.componentInstance.modalBtnCancelVisible = false; */
    /* modalRef.result.then(
      () => this.router.navigate(['/logon']),
      () => this.router.navigate(['/logon'])
    ); */
  }

  openErrorModal() {
    const dialogRef = this.dialog.open( DialogComponent, { data: {
      Title: 'Error logging in',
      Body: this.errorMessage,
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
  /*  const modalRef: NgbModalRef = this.modalService.open(ModalOkCancelComponent, { centered: true });
   modalRef.componentInstance.modalTitle = 'Registration Error!';
   modalRef.componentInstance.modalContent = this.errorMessage;
   modalRef.componentInstance.modalBtnCancelVisible = false; */
  }
}
