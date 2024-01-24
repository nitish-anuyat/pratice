import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeysPipe } from '../pipes/keys.pipe';
import { Setting } from '../models/setting';
import { CounterDirective } from '../directives/timer.directive';

@Component({
	selector: 'app-angular-otp',
	templateUrl: './angular-otp-input.component.html',
	styleUrls: ['./angular-otp-input.component.scss']
})

export class OtpInputComponent implements OnInit, OnChanges {
	@Input() setting: Setting = { 
		length: 4, 
		timer: 0,
		timerType: 0,
		btnText: 'Resend OTP'
	};
	@Input() hasError = false;
	@Output() valueChange = new EventEmitter<string | number | undefined>();
	
	@ViewChildren(CounterDirective) CounterDirective!: { first: { startTimer: () => void; }; };
	otpForm!: FormGroup;
	inputControls: FormControl[] = new Array(this.setting.length);
	componentKey = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
	public counter: number | undefined;
	
	constructor(private keysPipe: KeysPipe) {
		
	}

	ngOnChanges(): void {
		if(this.hasError){
			this.otpForm.reset();
		}
	}

	public ngOnInit(): void {
		this.otpForm = new FormGroup({})
		for (let index = 0; index < this.setting.length; index++) {
			this.otpForm.addControl(this.getControlName(index), new FormControl())
		}
	}
	
	private getControlName(idx : number) {
		return `ctrl_${idx}`;
	}

	isLeftArrow(e : KeyboardEvent) {
		return this.isKeyCode(e, 37);
	}

	isRightArrow(e : KeyboardEvent) {
		return this.isKeyCode(e, 39);
	}

	isBackspaceOrDelete(e : KeyboardEvent) {
		return e.key === "Backspace" || e.key === "Delete" || this.isKeyCode(e, 8) || this.isKeyCode(e, 46);
	}

	isKeyCode(e : KeyboardEvent, targetCode: number) {
		const key = e.keyCode || e.charCode;
		if(key == targetCode) { return true; }
		return false;
	}

	keyUp(e: any, inputIdx: number) {
		const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
		const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
		if (this.isRightArrow(e)) {
			this.setSelected(nextInputId);
			return;
		}
		if (this.isLeftArrow(e)) {
			this.setSelected(prevInputId);
			return;
		}
		const isBackspace = this.isBackspaceOrDelete(e);
		if (isBackspace && !e.target.value) {
			this.setSelected(prevInputId);
			this.rebuildValue();
			return;
		}
		if (!e.target.value) {
			return;
		}
		if (this.isValidEntry(e)) {
			this.focusTo(nextInputId);
		}
		this.rebuildValue();
	}

	appendKey(id: any) {
		return `${id}_${this.componentKey}`;
	}

	setSelected(eleId : string) {
		this.focusTo(eleId);
		const ele: any = document.getElementById(eleId);
		if (ele && ele.setSelectionRange) {
			setTimeout(() => {
				ele.setSelectionRange(0, 1);
			}, 0);
		}
	}

	isValidEntry(e : any) {
		const inp = String.fromCharCode(e.keyCode);
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		return isMobile || /[a-zA-Z0-9-_]/.test(inp) || (this.setting.allowKeyCodes && this.setting.allowKeyCodes.includes(e.keyCode)) || (e.keyCode >= 96 && e.keyCode <= 105);
	}

	focusTo(eleId: string) {
		const ele: any = document.getElementById(eleId);
		if (ele) {
			ele.focus();
			ele.selectionStart = ele.selectionEnd = 100;
		}
	}

	rebuildValue() {
		let val = '';
		this.keysPipe.transform(this.otpForm.controls).forEach(k => {
			if (this.otpForm.controls[k].value) {
				val += this.otpForm.controls[k].value;
			}
		});
		this.valueChange.emit(val);
	}

	public onCounterChange(e : any): void {
		this.counter = e;
		if(this.counter == 0) {
			this.valueChange.emit(-1);
		}
	}

	ressendOtp(): void {
		this.CounterDirective.first.startTimer();
		this.valueChange.emit(-2);
	}

	public formatSecsToMins(time: number) {   
		// Hours, minutes and seconds
		const hrs = ~~(time / 3600);
		const mins = ~~((time % 3600) / 60);
		const secs = ~~time % 60;
	
		// Output like "1:01" or "4:03:59" or "123:03:59"
		let ret = "";
		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	}
}