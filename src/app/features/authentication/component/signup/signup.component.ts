import { Component, OnChanges, OnInit, TransferState, makeStateKey } from '@angular/core';
import { AuthService } from '../../service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from "@ngrx/store";
import { fetchCountries } from "src/app/global/state/country";
import { environment } from 'src/environments/environment';
import { trimSpaceValidator } from 'src/app/global/validators/trimSpaceValidator';
import { ConfigService } from 'src/app/global/service';

// make state key in state to store user email
const STATE_KEY_USER_EMAIL = makeStateKey('user-email');
const STATE_KEY_PENDING_VERIFY = makeStateKey('pending-verify');
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnChanges{
  showPassword = false;
  showReenterPassword = false;
  submitted = false;
  signupForm: any;
  countries: Array<any> = [];
  countryDialCode = "+91";
  errMessage: any = false;
  configData: any;

  countries$ = this.store.select(fetchCountries);

  constructor(private authService: AuthService, private router: Router, private state: TransferState, private store: Store, private configService : ConfigService) {
    configService.getLocalConfig().subscribe((configData : any) => {
      this.configData = configData;
    })
  }

	ngOnInit(): void {
		this.createForm();
    this.getCountries();
	}

  getCountries() {
    this.countries$.subscribe((countriesList: any) => {
      this.countries = countriesList;
    });
  }
  
  ngOnChanges() {
		this.submitted = false;
		this.createForm();
	}

	get f() { return this.signupForm.controls; }

	createForm() {
		this.signupForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [
        Validators.required,
        trimSpaceValidator,
        Validators.maxLength(32)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        trimSpaceValidator,
        Validators.maxLength(32)
      ]),
      country: new FormControl(""),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern("[0-9]*")]),
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]),
      reenterPassword: new FormControl(null, [Validators.required]),
      referrerReferralCode: new FormControl(""),
      agreePrivacyPolicy: new FormControl(false),
      agreeTerms: new FormControl(false),
		},
    {
      validators: [this.match('password', 'reenterPassword')]
    });
	}

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
  
  signup() {
    this.errMessage = false;
    if(this.signupForm.invalid || !this.f.agreePrivacyPolicy.value || !this.f.agreeTerms.value){
      this.submitted = true;
      return;
    }
    const userData = {
      ...this.signupForm.value,
      agreePrivacyPolicy: undefined,
      agreeTerms: undefined,
      customerId: environment.customerId,
      "countryCode": this.countryDialCode
    }
    this.authService.signup(userData).subscribe(() =>{
      // console.log(res);
      this.state.set(STATE_KEY_USER_EMAIL, this.signupForm.get('email').value);
      this.state.set(STATE_KEY_PENDING_VERIFY, <any>"false");
      this.router.navigate(['/auth/verify']);
    }, (err : any) => {
      if(err.error.verificationPending){
        this.state.set(STATE_KEY_USER_EMAIL, this.signupForm.get('email').value);
        this.state.set(STATE_KEY_PENDING_VERIFY, <any>"true");
        this.router.navigate(['/auth/verify']);
      }
      this.errMessage = err.error.message;

    });
  }

  trackCountries(index: any, item : any) {
    return item._id;
  }

  onInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/\s/g, ''); // Remove spaces

    if (inputElement.value !== sanitizedValue) {

      inputElement.value = sanitizedValue; // Update input value without spaces

      this.signupForm.get(fieldName).setValue(sanitizedValue); // Update form control value

    }
  }
}
