import { Component, OnInit, OnChanges, makeStateKey, TransferState } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service';
import { LocalStorageService } from 'src/app/global/service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { allNavbarActions } from 'src/app/global/state/user';
import { TranslateService } from '@ngx-translate/core';

// make state key in state to store user email
const STATE_KEY_USER_EMAIL = makeStateKey('user-email');
const STATE_KEY_PENDING_VERIFY = makeStateKey('pending-verify');
const STATE_KEY_PLAN_DETAILS = makeStateKey('plan-details');
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnChanges {

	signinForm: any;
	submitted = false;
	err: any = false;
	err2 = false;
	showPassword = false;
	planDetails: any;

	constructor(private authService: AuthService, private localStorageService: LocalStorageService, private router: Router,
		private store: Store, private state: TransferState, private translateService: TranslateService) {
		this.planDetails = this.state.get(STATE_KEY_PLAN_DETAILS, <any>"");
	}

	ngOnInit(): void {
		this.createForm();
	}

	ngOnChanges() {
		this.submitted = false;
		this.createForm();
	}

	get f() { return this.signinForm.controls; }

	createForm() {
		this.signinForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required])
		});
	}

	signin(): void {
		this.err = false;
		this.err2 = false;
		this.submitted = true;

		if (this.signinForm.invalid) {
			this.err2 = true;
			return;
		}

		const userData = {
			email: this.signinForm.get('email').value,
			password: this.signinForm.get('password').value,
			customerId: environment.customerId
		};

		this.authService.signin(userData)
			.subscribe((res: any) => {
				this.localStorageService.setToken(res.token);
				this.store.dispatch(allNavbarActions.loginFlowInitiated())
				const planDetails: any = JSON.parse(this.localStorageService.getItem('planDetails') || '{}');
				if(planDetails?.route){
					this.router.navigate([planDetails.route]);
				} else {
					this.router.navigate(['/']);
				}
			}, (err: any) => {
				if(err?.error?.message?.includes("incorrect")){
					this.err = this.translateService.instant('auth.sign_in.error_sub_text');
				} else {
					this.err = err?.error?.message;
					if(err.error.verficationPending){
						this.state.set(STATE_KEY_USER_EMAIL, this.signinForm.get('email').value);
						this.state.set(STATE_KEY_PENDING_VERIFY, <any>"true");
						this.router.navigate(['/auth/verify']);
					}
				}
			});
	}
}
