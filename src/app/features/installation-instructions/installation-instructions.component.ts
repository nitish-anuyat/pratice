import { Component, OnInit } from '@angular/core';
import { InstallationService } from './service/installation.service';
import { AlertService, DialogService, LocalStorageService } from 'src/app/global/service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImportantComponent } from 'src/app/global/dialog/important/important.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-installation-instructions',
  templateUrl: './installation-instructions.component.html',
  styleUrls: ['./installation-instructions.component.scss']
})
export class InstallationInstructionsComponent implements OnInit{

  isManual = false;
  selectedValue = 0; 
  inProgress = false;
  activationCode!: string;
  smdpAddress!: string;
  qrCodeDownloadLink!: SafeUrl;
  stepsButtonArr : Array<any> = [];
  stepsImageArr : Array<any> = [];
  selectedDeviceType = 'ios';
  selectedInstructionType = 'qr';
  isAndroid = false;
  activationCodeForQR!: string;
  copyText = this.translateService.instant('installation.copy');
  upcomingPlan: any;

  /* QR Code Steps Buttons - Start */ 
  iOSQRButtons: Array<any> = [
    {label: 'installation.ios.labels.0', isChecked: false}, 
    {label: 'installation.ios.labels.1', isChecked: false}, 
    {label: 'installation.ios.labels.2', isChecked: false}, 
    {label: 'installation.ios.labels.3', isChecked: false}, 
    {label: 'installation.ios.labels.4', isChecked: false}
  ];
  
  androidQRButtons: Array<any> = [
    {label: 'installation.android.labels.0', isChecked: false}, 
    {label: 'installation.android.labels.1', isChecked: false}, 
    {label: 'installation.android.labels.2', isChecked: false}, 
    {label: 'installation.android.labels.3', isChecked: false}
  ];
  /* QR Code Steps Buttons - End */ 
  
  /* Manual Common Steps Buttons - Start */ 
  manualButtons: Array<any> = [
    {label: 'installation.manual_labels.0', isChecked: false}, 
    {label: 'installation.manual_labels.1', isChecked: false}, 
    {label: 'installation.manual_labels.2', isChecked: false}, 
    {label: 'installation.manual_labels.3', isChecked: false}, 
    {label: 'installation.manual_labels.4', isChecked: false}
  ];
  /* Manual Common Steps Buttons - End */ 
  
  /* Steps Image Array - Start */
  iOSQRStepsImageArr: Array<any> = [
    { imageUrl: 'assets/images/installation/iOS/iOSQR1.webp', description: 'installation.ios.qr_steps.0', cssClass: 'bottom-common' },
    { imageUrl: 'assets/images/installation/iOS/iOSQR2.webp', description: 'installation.ios.qr_steps.1', cssClass: 'bottom-8' },
    { imageUrl: 'assets/images/installation/iOS/iOSQR3.webp', description: 'installation.ios.qr_steps.2', cssClass:'bottom-3' },
    { imageUrl: 'assets/images/installation/iOS/iOSQR4.webp', description: 'installation.ios.qr_steps.3', cssClass:'bottom-common' },
    { imageUrl: 'assets/images/installation/iOS/iOSQR5.webp', description: 'installation.ios.qr_steps.4', cssClass:'bottom-4 padding-end-large' }
  ]

  iOSManualStepsImageArr: Array<any> = [
    { imageUrl: 'assets/images/installation/iOS/iOSManual1.webp', description: 'installation.ios.manual_steps.0', cssClass:'bottom-3' },
    { imageUrl: 'assets/images/installation/iOS/iOSManual2.webp', description: 'installation.ios.manual_steps.1', cssClass:'bottom-3' },
    { imageUrl: 'assets/images/installation/iOS/iOSManual3.webp', description: 'installation.ios.manual_steps.2', cssClass:'bottom-8' },
    { imageUrl: 'assets/images/installation/iOS/iOSManual4.webp', description: 'installation.ios.manual_steps.3', cssClass:'bottom-common' },
    { imageUrl: 'assets/images/installation/iOS/iOSManual5.webp', description: 'installation.ios.manual_steps.4', cssClass:'bottom-4 padding-end-large' }
  ]
  
  androidQRStepsImageArr: Array<any> = [
    { imageUrl: 'assets/images/installation/android/androidQR1.webp', description: 'installation.android.qr_steps.0', cssClass:'bottom-6' },
    { imageUrl: 'assets/images/installation/android/androidQR2.webp', description: 'installation.android.qr_steps.1', cssClass:'bottom-8' },
    { imageUrl: 'assets/images/installation/android/androidQR3.webp', description: 'installation.android.qr_steps.2', cssClass:'top-1' },
    { imageUrl: 'assets/images/installation/android/androidQR4.webp', description: 'installation.android.qr_steps.3', cssClass:'bottom-4 padding-end-large' },
  ]

  androidManualStepsImageArr: Array<any> = [
    { imageUrl: 'assets/images/installation/android/androidManual1.webp', description: 'installation.android.manual_steps.0', cssClass:'bottom-6'},
    { imageUrl: 'assets/images/installation/android/androidManual2.webp', description: 'installation.android.manual_steps.1', cssClass:'bottom-4' },
    { imageUrl: 'assets/images/installation/android/androidManual3.webp', description: 'installation.android.manual_steps.2', cssClass:'bottom-8' },
    { imageUrl: 'assets/images/installation/android/androidManual4.webp', description: 'installation.android.manual_steps.3', cssClass:'top-1' },
    { imageUrl: 'assets/images/installation/android/androidManual5.webp', description: 'installation.android.manual_steps.4', cssClass:'bottom-4 padding-end-large' }
  ]
  /* Steps Image Array - End */

  constructor (
    private installationService: InstallationService, 
    private alertService: AlertService,
    private dialogService: DialogService,
    private sanitize: DomSanitizer,
    private router: Router,
    private localStorage: LocalStorageService,
    private translateService: TranslateService
  ) {
    this.stepsButtonArr = this.iOSQRButtons;
    this.stepsImageArr = this.iOSQRStepsImageArr;
    this.stepsImageArr.forEach((step) => { 
      this.sanitize.bypassSecurityTrustHtml(step.description)
    })
  }
  
  ngOnInit() {
    this.upcomingPlan = JSON.parse(this.localStorage.getItem('upcomingPlan')!);
    this.getActivationCode();
  }

  getActivationCode() {
    this.inProgress = true;
    this.installationService.getActivationCode().subscribe((response) => {
      this.activationCodeForQR = response.activationCode;
      const code = response.activationCode.split('$');
      this.smdpAddress = code[1]
      this.activationCode = code[2]
      this.inProgress = false;
    }, 
    () => {
      this.inProgress = false;
    })
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  // Send QR Code via Email
  sendEmailQRCode() {
    this.inProgress = true;
    this.installationService.sendEmailQRCode().subscribe((response: any) => { 
      if(response.status == 200) {
        this.alertService.success(this.translateService.instant("alert.qr_to_mail"))
        this.inProgress = false;
      }
    }, 
    error => {
      this.inProgress = false;
      this.alertService.error(error)
    })
  }

  downloadQRCode(){
    this.alertService.success(this.translateService.instant("alert.qr_to_device"));
  }

  continue() {
    this.dialogService.openModal(ImportantComponent, { context: { body : 'installation.manual_activate_plan', active: false, upcomingPlan: this.upcomingPlan} });
  }

  /* Instruction Selection - Start */
  instructions(value: string) { 
    this.selectedInstructionType = value;
  
    if(this.selectedInstructionType == 'manual') {
      this.stepsButtonArr = this.manualButtons;
      this.stepsImageArr = this.isAndroid ? this.androidManualStepsImageArr : this.iOSManualStepsImageArr;
    }
    else {
      this.stepsButtonArr = this.isAndroid ? this.androidQRButtons : this.iOSQRButtons;
      this.stepsImageArr = this.isAndroid ? this.androidQRStepsImageArr : this.iOSQRStepsImageArr;
    }
    
    this.selectedValue = 0;
    this.stepsImageArr.forEach((step) => {
      this.sanitize.bypassSecurityTrustHtml(step.description);
    });
  }
  /* Instruction Selection - End */

  /* Device Selection - Start */
  selectDevice(type: string) {
    this.selectedDeviceType = type; 
    console.log(type, `Device: ${this.selectedDeviceType}`, `this.isManual: ${this.isManual}`, `this.isAndroid: ${this.isAndroid}`)
    
    if(this.selectedDeviceType == 'android') {
      this.stepsButtonArr = this.isManual ? this.manualButtons : this.androidQRButtons;
      this.stepsImageArr = this.isManual ? this.androidManualStepsImageArr : this.androidQRStepsImageArr;
    }
    else {
      this.stepsButtonArr = this.isManual ? this.manualButtons : this.iOSQRButtons;
      this.stepsImageArr = this.isManual ? this.iOSManualStepsImageArr : this.iOSQRStepsImageArr;
    }
    
    this.selectedValue = 0;
    this.stepsImageArr.forEach((step) => {
      this.sanitize.bypassSecurityTrustHtml(step.description);
    });
  }
  /* Device Selection - End */
  
  // Copy data
  copyToClipboard(event: MouseEvent, text: string | undefined) {
    event.preventDefault();

    if(!text) {
      return;
    }
    navigator.clipboard.writeText(text);
  }

  goToHome(){
    this.router.navigate(['/']);
  }
}
