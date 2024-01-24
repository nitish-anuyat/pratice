import { Component, TransferState, makeStateKey } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// make state key in state to store otp
const STATE_KEY_OTP = makeStateKey('otp');

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: any = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  
  submitted = false;
  err = false;
  showOTPSection = false;
  otpError = true;
  otpValue = '';
  public settings = {
    length: 6,
    numbersOnly: true,
    timer: 0,
    timerType: 1,
    btnText: 'Resend OTP'
  }

  constructor( private authService : AuthService, private router: Router, private state: TransferState, private translateService: TranslateService) {
    
    this.forgotPasswordForm.get('email').valueChanges.subscribe(() =>{
      this.showOTPSection = false;
    })
    this.settings.btnText = this.translateService.instant('form.resend_otp');
  }


  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(){
    if(this.showOTPSection && this.otpValue.trim() != '' && !this.otpError){
      this.verifyOtp();
    } else {
      this.sendOtp();
    }
  }

  verifyOtp(){
    const userData = {
      email: this.forgotPasswordForm.get('email').value,
      otp: this.otpValue
    };
    this.authService.validateOTP(userData).subscribe(( ) => {
      this.state.set(STATE_KEY_OTP, <any>userData.otp);
      this.router.navigate(['/auth/reset-password']);
    }, () => {
      this.otpError = true;
    })
  }

  sendOtp(){
    this.err = false;
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const userData = {
      email: this.forgotPasswordForm.get('email').value,
    };

    this.authService.forgotPassword(userData)           //api call
      .subscribe( () => {
        this.settings.timer = 120;
        this.showOTPSection = true;
        this.otpError = false;
      }, () => {
        this.forgotPasswordForm.controls['email'].setErrors({'incorrect' : true});
        this.showOTPSection = false;
        this.err = true;
      });
  }

  onOTPChange(value : any){
    if(value.length === this.settings.length) {
      this.otpValue = value;
      this.otpError = false;
    } else if(value === -2){
      this.sendOtp();
    }
  }
}
