import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { BrowserService } from '../global/service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  currentUrl: string;
  
  handleScroll(event : any) {
    this.browserService.setOnScroll(event);
  }

  constructor(private router : Router, private browserService : BrowserService){
    
    this.currentUrl= this.router.url
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    )
    .subscribe(
      event => this.currentUrl = event.url
    );
  }
}
