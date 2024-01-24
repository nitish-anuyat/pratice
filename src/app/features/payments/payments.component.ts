import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentStatusComponent } from 'src/app/global/dialog/payment-status/payment-status.component';
import { DialogService } from 'src/app/global/service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  transactionId = '';
  country = '';
  stripeProductId = '';
  constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe( (params : any) => {
        this.transactionId = params.transactionId.replace("''", "");
        this.country = params.country;
        this.stripeProductId = params.stripeProductId;
        this.dialogService.openModal(PaymentStatusComponent, { context: { transactionId : this.transactionId, country: this.country, stripeProductId: this.stripeProductId }, cssClass: 'bg-transparent px-4 px-md-0' })
      }
    );
  }
}
