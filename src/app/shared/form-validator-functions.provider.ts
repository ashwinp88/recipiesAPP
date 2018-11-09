import { FormControl } from '@angular/forms';

export module FormValidatorFunctions {

export function getErrorForControl(ctrl: string, signupForm: FormControl): string {
    if (signupForm.get(ctrl).errors == null) {
        return null;
    }
    if (signupForm.get(ctrl).errors['minlength']) {
        return `Length should be atleast ${signupForm.get(ctrl).errors['minlength']['requiredLength']} characters.`;
        }
    if (signupForm.get(ctrl).errors['specialCharacterMissing']) {
        return 'Field requires at least one special character';
    }
    if (signupForm.get(ctrl).errors['numericCharacterMissing']) {
        return 'Field requires at least one numeric character';
    }
    if (signupForm.get(ctrl).errors['hasWhiteSpace']) {
        return 'Spaces are not allowed.';
    }
    if (signupForm.get(ctrl).errors['upperCaseCharacterMissing']) {
        return 'Field requires at least one upper-case character.';
    }
    if (signupForm.get(ctrl).errors['passwordDoesNotMatch']) {
        return 'Passwords do not match.';
    }
    if (signupForm.get(ctrl).errors['errorSigningUp']) {
        return this.errorMessage;
    }
    if (signupForm.get(ctrl).errors['required']) {
        return 'This field is required.';
    }
    if (signupForm.get(ctrl).errors['email']) {
        return 'This is not a valid email.';
    }
    return 'Error in field';
}

export function isValidPassword(control: FormControl): {[s: string]: boolean} {
    const specialCharPatt = /[!-/]/g;
    const numericCharPatt = /[0-9]/g;
    const whiteSpacePatt = /\s/g;
    const upperCasePatt = /[A-Z]/g;
    if (!specialCharPatt.test(<string>control.value)) {
      return {'specialCharacterMissing': true};
    }
    if (!numericCharPatt.test(<string>control.value)) {
      return {'numericCharacterMissing': true};
    }
    if (whiteSpacePatt.test(<string>control.value)) {
      return {'hasWhiteSpace': true};
    }
    if (!upperCasePatt.test(<string>control.value)) {
      return {'upperCaseCharacterMissing': true};
    }
    return null;
  }
}
