import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { Store } from '@ngrx/store';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';
import { Currency } from 'src/app/global/models';
import { AlertService, ConfigService, UserService } from 'src/app/global/service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reward-points',
  templateUrl: './reward-points.component.html',
  styleUrls: ['./reward-points.component.scss'],
})
export class RewardPointsComponent {
  referralCode: FormControl = new FormControl('');
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;
  rewardPointsDetails: any;
  transactionHistory: Array<any> = [];
  configData: any;
  constructor(
    private clipboard: Clipboard,
    private store: Store,
    private userService: UserService,
    private alertService : AlertService,
    private configService : ConfigService,
    private translateService : TranslateService
  ) {
    this.defaultCurrency$.subscribe((currency: any) => {
      this.defaultCurrency = currency;
    });
    this.userService.getTransactionsHistory(true).subscribe((result : any) =>{
      this.transactionHistory = result;
    });
    configService.getLocalConfig().subscribe((configData : any) => {
      this.configData = configData;
    })
    this.getRewardPoints();
  }

  copyCode() {
    this.clipboard.copy(this.referralCode.value);
    this.alertService.success(this.translateService.instant('alert.clipboard_message'));
  }

  getRewardPoints() {
    this.userService.getRewardPointsDetails().subscribe((result: any) => {
      if (result) {
        this.rewardPointsDetails = result;
        this.referralCode.setValue(result?.referralCode);
      }
    });
  }
}
