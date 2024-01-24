import { Component, OnInit, TransferState, makeStateKey } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/global/service';
import { TranslateService } from '@ngx-translate/core';

// make state key in state to store otp
const STATE_KEY_OTP = makeStateKey('otp');
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: any;
  submitted = false;
  err : any = false;
	err2 = false;
  passwordStrength = this.translateService.instant('form.new_password.weak');
  passwordStrengthIndex = 0;
  passwordStrengthColors: Array<string> = ['darkred', '#FFC400', 'yellowgreen', '#00C853'];
  otpValue = "";

  constructor( private state: TransferState, private authService: AuthService, private router : Router, private alertService : AlertService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.resetPassForm = new FormGroup({
      newPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]),
      confirmPassword: new FormControl(null, [Validators.required])
    },
    {
      validators: [this.match('newPassword', 'confirmPassword')]
    });

    this.otpValue = this.state.get(STATE_KEY_OTP, <any>"");
    if(this.otpValue.trim() == ''){
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  get f() { return this.resetPassForm.controls; }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        controls.get(checkControlName)?.setErrors(null);
        return null;
      }
    };
  }

  resetPassword(){
    this.submitted = true;
    if(this.resetPassForm.invalid){
      return ;
    }

    const userData = {
      otp: this.otpValue,
      newPassword : this.resetPassForm.get('newPassword').value,
      oldPassword : this.resetPassForm.get('confirmPassword').value
    }

    this.authService.resetPassword(userData)
      .subscribe(() => {
        this.alertService.success(this.translateService.instant('alert.password_update_success')).subscribe(
          () => {
            this.router.navigate(['/auth/signin']);
          }
        );
      }, (error : any) => {
        if(error?.error?.message.includes("old password")){
          this.err = this.translateService.instant('form.new_password.old_password_error');
        } else {
          this.err = error?.error?.message;
        }
      })
  }

  onChangePasswordStrength(value: any){
    this.passwordStrengthIndex = value;
    switch(value){
      case 2:
        this.passwordStrength = this.translateService.instant('form.new_password.fair');
        break;
      case 3:
        this.passwordStrength = this.translateService.instant('form.new_password.strong');
        break;
      case 4:
        this.passwordStrength = this.translateService.instant('form.new_password.very_strong');
        break;
      default:
        this.passwordStrength = this.translateService.instant('form.new_password.weak');
    }
  }
}
