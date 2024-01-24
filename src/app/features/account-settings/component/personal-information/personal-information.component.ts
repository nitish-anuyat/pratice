import { Component, OnChanges, OnInit, TransferState } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchCountries } from 'src/app/global/state/country';
import { AuthService } from 'src/app/features/authentication/service';
import { User } from 'src/app/global/models';
import {
  selectUserDetails,
  updateUserDetails,
} from 'src/app/global/state/user';
import { AccountSettingsService } from '../../service/account-settings.service';
import { AlertService } from 'src/app/global/service';
import { UserService } from 'src/app/global/service/user.service';
import { trimSpaceValidator } from 'src/app/global/validators/trimSpaceValidator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit, OnChanges{
  accountSettingForm: any;
  countries: Array<any> = [];
  countryDialCode = '+91';
  errMessage: any = false;
  submitted = false;
  user!: User;
  userDetails: any;
  isEdit = false;
  err: any = false;

  countries$ = this.store.select(fetchCountries);
  userDetails$ = this.store.select(selectUserDetails);

  constructor(
    private authService: AuthService,
    private router: Router,
    private state: TransferState,
    private store: Store,
    private route: ActivatedRoute,
    private accSettingService: AccountSettingsService,
    private alertService: AlertService,
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.createForm();
    this.isEdit = false;

    this.userDetails$.subscribe((userDetails) => {
      this.userDetails = userDetails;
      this.setValues();
    });
  }

  getCountries() {
    this.countries$.subscribe((countriesList: any) => {
      this.countries = countriesList;
    });
  }

  ngOnChanges() {
    this.submitted = false;
  }

  get f() {
    return this.accountSettingForm.controls;
  }

  createForm() {
    this.accountSettingForm = new FormGroup({
      email: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      firstName: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        trimSpaceValidator,
        Validators.maxLength(32)
      ]),
      lastName: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        trimSpaceValidator,
        Validators.maxLength(32)
      ]),
      mobile: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern('[0-9]*'),
      ]),
      country: new FormControl({ value: null, disabled: true }),
    });
  }

  trackCountries(index: any, item: any) {
    return item._id;
  }

  setValues() {
    this.accountSettingForm.patchValue({
      firstName: this.userDetails?.firstName,
      lastName: this.userDetails?.lastName,
      mobile: this.userDetails?.mobile,
      country: '', //this.countries.find(country => country.dial_code == this.userDetails?.countryCode).name
      email: this.userDetails?.email,
    });
    this.countryDialCode = this.userDetails?.countryCode;
  }

  edit() {
    this.isEdit = true;
    this.f.firstName.enable();
    this.f.lastName.enable();
    this.f.mobile.enable();
    this.f.country.enable();
  }

  cancel() {
    this.isEdit = false;
    this.f.firstName.markAsPristine();
    this.f.lastName.markAsPristine();
    this.f.mobile.markAsPristine();
    this.f.country.markAsPristine();
    this.setValues();
    this.f.firstName.disable();
    this.f.lastName.disable();
    this.f.mobile.disable();
    this.f.country.disable();
    this.err = false;
  }

  updateProfile() {
    this.err = false;
    if (this.accountSettingForm.invalid || !this.countryDialCode) {
      this.submitted = true;
      return;
    } else {
      const userData = {
        firstName: this.accountSettingForm.get('firstName').value,
        lastName: this.accountSettingForm.get('lastName').value,
        mobile: this.accountSettingForm.get('mobile').value,
        countryCode: this.countryDialCode,
      };

      this.userService.updateProfile(userData).subscribe(
        (res: any) => {
          this.store.dispatch(updateUserDetails({ userDetails: res }));
          this.cancel();
          this.alertService
            .success( this.translateService.instant('alert.profile_update_success'))
            .subscribe(() => {});
        },
        (err: any) => {
          console.log('err :', err);
          this.err = err.error.message;
        }
      );
    }
  }

  isNumber(evt: any) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 47 && charCode < 58) {
      return true;
    }
    return false;
  }

  onInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/\s/g, ''); // Remove spaces

    if (inputElement.value !== sanitizedValue) {

      inputElement.value = sanitizedValue; // Update input value without spaces

      this.accountSettingForm.get(fieldName).setValue(sanitizedValue); // Update form control value

    }
  }
}
