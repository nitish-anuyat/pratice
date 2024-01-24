import { Component, OnChanges, OnInit, TransferState } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/features/authentication/service';
import { AccountSettingsService } from '../../service/account-settings.service';
import { AlertService } from 'src/app/global/service';
import { UserService } from 'src/app/global/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnChanges{
  showPassword = false;
  showReenterPassword = false;
  newPassword = false;
  accountSettingForm: any;
  isEdit = false;

  err: any = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private state: TransferState,
    private store: Store,
    private route: ActivatedRoute,
    private accSettingService: AccountSettingsService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges() {
    this.submitted = false;
    this.createForm();
  }

  get f() {
    return this.accountSettingForm.controls;
  }

  createForm() {
    this.accountSettingForm = new FormGroup(
      {
        currentPassword: new FormControl(null, [Validators.required]),
        reenterPassword: new FormControl(null, [Validators.required]),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
        ]),
      },
      {
        validators: [this.match('newPassword', 'reenterPassword')],
      }
    );
  }

  trackCountries(index: any, item: any) {
    return item._id;
  }

  edit() {
    this.isEdit = true;
  }

  cancel() {
    this.isEdit = false;
    this.submitted = false;
    this.f.currentPassword.markAsPristine();
    this.f.reenterPassword.markAsPristine();
    this.f.newPassword.markAsPristine();
    this.accountSettingForm.reset();
    this.err = false;
  }

  // match(controlName: string, checkControlName: string): ValidatorFn {
  //   return (controls: AbstractControl) => {
  //     const control = controls.get(controlName);
  //     const checkControl = controls.get(checkControlName);

  //     if (checkControl?.  && !checkControl.errors['matching']) {
  //       return null;
  //     }

  //     if (control?.value !== checkControl?.value) {
  //       controls.get(checkControlName)?.setErrors({ matching: true });
  //       return { matching: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        // Clear the "matching" error when the passwords match
        if (checkControl?.errors && checkControl.errors['matching']) {
          controls.get(checkControlName)?.setErrors(null);
        }
        return null;
      }
    };
  }

  changePassword() {
    this.err = false;
    if (this.accountSettingForm.invalid) {
      this.submitted = true;
      return;
    } else {
      const userData = {
        currentPassword: this.accountSettingForm.get('currentPassword').value,
        newPassword: this.accountSettingForm.get('newPassword').value,
        verifyPassword: this.accountSettingForm.get('reenterPassword').value,
      };

      this.userService.changePassword(userData).subscribe(
        (res: any) => {
          this.cancel();

          this.alertService.success(res.message).subscribe(() => {});
        },
        (err: any) => {
          console.log('err :', err);
          this.err = err.error.message;
        }
      );

      // this.store.dispatch(updateUserDetails(this.userDetails));
    }
  }
}
