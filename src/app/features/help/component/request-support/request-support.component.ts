import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpService } from '../../service/help.service';
import { trimSpaceValidator } from 'src/app/global/validators/trimSpaceValidator';
import { DialogService } from 'src/app/global/service';
import { ThanksComponent } from '../thanks/thanks.component';
import { Store } from '@ngrx/store';
import { fetchCountries } from 'src/app/global/state/country';

@Component({
  selector: 'app-request-support',
  templateUrl: './request-support.component.html',
  styleUrls: ['./request-support.component.scss'],
})
export class RequestSupportComponent implements OnInit{
  requestSupportForm: any;
  submitted = false;
  err = false;
  err2 = false;
  ticket: any;
  countries: Array<any> = [];
  countryDialCode = "+91";

  countries$ = this.store.select(fetchCountries);

  constructor(private helpService: HelpService,
    private dialogService: DialogService,
    private store: Store
  ) {}

  get f() {
    return this.requestSupportForm.controls;
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

  trackCountries(index: any, item : any) {
    return item._id;
  }

  createForm() {
    this.requestSupportForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required, trimSpaceValidator]),
      message: new FormControl(null, [Validators.required, trimSpaceValidator]),
      deviceInfo: new FormControl(null, [
        Validators.required,
        trimSpaceValidator,
      ]),
      country: new FormControl(""),
      number: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*'),
      ]),
    });
  }

  submit() {
    this.err = false;
    this.err2 = false;
    this.submitted = true;

    if (this.requestSupportForm.invalid) {
      this.err2 = true;
      return;
    }

    const requestBody = {...this.requestSupportForm.value, countryCode: this.countryDialCode};
    this.helpService.createRequest(requestBody).subscribe(
      (res: any) => {
        this.ticket = res?.support?.ticket
        setTimeout(() => {
          this.showThanksPopUp(this.ticket);
        }, 500);
        // this.requestSupportForm.reset();
        this.markFormGroupPristine(this.requestSupportForm);

      },
      (err) => {
        this.err = err.error.message;
      }
    );
  }

  isNumber(evt: any) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 47 && charCode < 58) {
      return true;
    }
    return false;
  }

  showThanksPopUp(ticket: any){
    this.dialogService.openModal(ThanksComponent, { context: {ticket: ticket }, cssClass: 'thanks-modal-support-vw' });
  }

  markFormGroupPristine(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsPristine();
    });
  }
}
