import { Component, OnInit, TransferState, makeStateKey } from '@angular/core';
import { AuthService } from '../../service';
import { LocalStorageService, AlertService } from 'src/app/global/service';
import { allNavbarActions } from 'src/app/global/state/user';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// make state key in state to store user email
const STATE_KEY_USER_EMAIL = makeStateKey('user-email');
const STATE_KEY_PENDING_VERIFY = makeStateKey('pending-verify');
const STATE_KEY_PLAN_DETAILS = makeStateKey('plan-details');

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit{

  otpError = true;
  otpValue = '';
  public settings : any = {
    length: 6,
    numbersOnly: true,
    timer: 120,
    timerType: 1,
    btnText: 'Resend OTP'
  }
  userEmail = "";
  pendingVerify: string | undefined = "";
  err = false;
  planDetails: any;

  constructor( 
    private state: TransferState,
    private router: Router,
    private store: Store,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private translateService: TranslateService ) {}

  ngOnInit(): void {
    this.userEmail = this.state.get(STATE_KEY_USER_EMAIL, <any>"");
    if(this.userEmail.trim() == ''){
      this.router.navigate(['/auth/signup']);
    }
    this.pendingVerify = this.state.get(STATE_KEY_PENDING_VERIFY, <any>"");
    if(this.pendingVerify == 'true'){
      this.sendOtp();
    }
    this.planDetails = this.state.get(STATE_KEY_PLAN_DETAILS, <any>"");
    this.settings.btnText = this.translateService.instant('form.resend_otp');
  }
  
  onOTPChange(value : any){
    if(value.length == this.settings.length) {
      this.otpValue = value;
      this.otpError = false;
    } else if(value == -2){
      this.sendOtp();
    }
  }

  sendOtp(){
    const userData = {
      email: this.userEmail,
    };

    this.authService.resendOTP(userData)           //api call
      .subscribe( () => {
        this.settings.timer = 120;
        this.otpError = false;
      }, (error : any) => {
        this.err = true;
        console.log(error);
      });
  }

  verifyOtp(){
    const userData = {
      email: this.userEmail,
      otp: this.otpValue
    };
    this.authService.verifyOTP(userData).subscribe(( res: any) => {
      if(res?.tokenResponse?.token){
        this.alertService.success(this.translateService.instant('alert.account_verify_success')).subscribe(() => {
          this.localStorageService.setToken(res.tokenResponse.token);
          this.store.dispatch(allNavbarActions.loginFlowInitiated())
          const planDetails: any = JSON.parse(this.localStorageService.getItem('planDetails') || '{}');
          if(planDetails?.route){
            this.router.navigate([planDetails.route]);
          } else {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.router.navigate(['/auth/signin']);
      }
    }, () => {
      this.settings.timer = 0;
      this.settings.btnText = this.translateService.instant('form.resend_otp');
      this.settings.btnLabel = this.translateService.instant('form.not_receive_otp');
      this.settings.btnClass = "text-decoration-none";
      this.otpError = true;
    })
  }

}
