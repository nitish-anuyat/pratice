import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../service/help.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trimSpaceValidator } from 'src/app/global/validators/trimSpaceValidator';
import { DialogService } from 'src/app/global/service';
import { ThanksComponent } from '../thanks/thanks.component';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{

  contactUsForm: any;
	submitted = false;
	err = false;
	err2 = false;

  constructor( 
    private helpService : HelpService,
    private dialogService: DialogService,
    private translateService: TranslateService
    ) { }

  get f() { return this.contactUsForm.controls; }

	ngOnInit(): void {
		this.createForm();
	}

  createForm(){
    this.contactUsForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required, trimSpaceValidator]),
      message: new FormControl(null, [Validators.required, trimSpaceValidator]),
		});
  }

  submit(){
    this.err = false;
		this.err2 = false;
		this.submitted = true;

		if (this.contactUsForm.invalid) {
			this.err2 = true;
			return;
		}

    const payload = {
      ...this.contactUsForm.value,
      customerId: environment.customerId,
    }
    this.helpService.supportRequest(payload).subscribe(
      (res : any) => {
        console.log(res);
        setTimeout(() => {
          this.showThanksPopUp();
        }, 500);
        this.markFormGroupPristine(this.contactUsForm);
        // this.contactUsForm.reset();

      },
      (err) => {
        this.err = err.error.message;
      }
    )
  }

  showThanksPopUp(){
    this.dialogService.openModal(ThanksComponent, { context: {contactTxt: this.translateService.instant('help.message_on_contact') }, cssClass: 'thanks-modal-contact-vw' });
  }

  markFormGroupPristine(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsPristine();
    });
  }
}
