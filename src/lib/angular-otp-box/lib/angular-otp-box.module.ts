import { NgModule,  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { KeysPipe } from './pipes/keys.pipe';
import { NumberOnlyDirective } from './directives/numberOnly.directive';
import { OtpInputComponent } from './components/angular-otp-input.component';
import { CounterDirective } from './directives/timer.directive';

@NgModule({
  declarations: [
    OtpInputComponent,
    KeysPipe,
    NumberOnlyDirective,
    CounterDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OtpInputComponent
  ],
  providers:[KeysPipe]
})
export class AngularOtpLibModule { }
