import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Currency } from 'src/app/global/models';
import { UserService } from 'src/app/global/service';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {
  transactionHistory: Array<any> = [];
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;

  transactionsLabel: any = {
    purchase: 'Reward points on purchase',
    referral: 'Reward points on referral',
    redeem: 'Purchase using reward points'
  }
  constructor(private store : Store, private userService : UserService){
    this.defaultCurrency$.subscribe((currency: any) => { 
      this.defaultCurrency = currency;
    });

    this.getTransactionHistory();
  }

  trackTransaction(item: any, index: number){
    return index;
  }

  getTransactionHistory(){
    this.userService.getTransactionsHistory().subscribe((result : any) => {
      if(result.length > 0){
        this.transactionHistory = result;
        this.userService.setTransactionHistory(result);
      }
    });
  }
}
