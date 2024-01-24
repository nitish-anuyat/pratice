import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/global/state/user';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  userDetails$ = this.store.select(selectUserDetails);
  
  userDetails: any;
  selectedSection = 'contact-us';
  
  constructor(private router: Router, private store: Store){
    this.selectedSection = router.url.replace('/', '');
    this.userDetails$.subscribe(details => this.userDetails = details );
  }
}
