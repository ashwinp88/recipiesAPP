import { Component, OnInit, OnDestroy } from '@angular/core';

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidatorFunctions } from 'src/app/shared/form-validator-functions.provider';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkCancelComponent } from '../modal-ok-cancel/modal-ok-cancel.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit, OnDestroy {

  faUser = faUser;
  faLock = faLock;
  formValidators = FormValidatorFunctions;
  errorMessage = '';

  private userValidatorSubscription: Subscription;

  logonForm: FormGroup;

  constructor(public authService: AuthService, public modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.logonForm = new FormGroup(
      {
        'usr': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'password': new FormControl( { value: '', disabled: true } , Validators.required),
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

  onLogon() {
    this.authService.logon(this.logonForm.get('usr').value,
                            this.logonForm.get('password').value).subscribe(
      (value) => {
        this.authService.uName = value['userName'];
        this.authService.authToken = value['access_token'];
        this.authService.isAuthorized = true;
        this.router.navigate(['/recipies']);
      },
      (errorValue: HttpErrorResponse) => {
        if (errorValue['error']) {
          if (errorValue['error']['error_description']) {
            this.errorMessage =  errorValue['error']['error_description'];
          }
        } else {
          this.errorMessage = errorValue['message'];
        }
        this.openErrorModal();
      }
    );
  }

   openErrorModal() {
   const modalRef: NgbModalRef = this.modalService.open(ModalOkCancelComponent, { centered: true });
   modalRef.componentInstance.modalTitle = 'Error Logging in';
   modalRef.componentInstance.modalContent = this.errorMessage;
   modalRef.componentInstance.modalBtnCancelVisible = false;
  }
}
