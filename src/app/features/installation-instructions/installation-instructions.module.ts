import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallationInstructionsRoutingModule } from './installation-instructions-routing.module';
import { SharedModule } from 'src/app/global/shared.module';
import { InstallationInstructionsComponent } from './installation-instructions.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [InstallationInstructionsComponent],
  imports: [
    CommonModule,
    InstallationInstructionsRoutingModule,
    QRCodeModule,
    SharedModule
  ]
})
export class InstallationInstructionsModule { }
