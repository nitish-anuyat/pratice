import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/global/state/user';
import { ConfigService } from 'src/app/global/service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit{
  userDetails: any;
  userDetails$ = this.store.select(selectUserDetails);
  configData: any;
  selectedSection = 'account';
  constructor(
    private router: Router,
    private store: Store,
    private configService: ConfigService
  ) {
    this.selectedSection = router.url.replace('/settings/', '');

    configService.getLocalConfig().subscribe((configData : any) => {
      this.configData = configData;
    });
  }

  ngOnInit(): void {
    this.userDetails$.subscribe(details => {
      this.userDetails = details
      // this.selectedSection = this.userDetails ? 'account' : 'currency';
    });
  }
}
