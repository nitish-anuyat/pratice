import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from 'src/app/global/service';
import gsap from 'gsap';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() subDetails!: string;
  @Input() backToRoute!: string;
  @Input() titleStyle: any;

  @Output() backEvent : EventEmitter<any> = new EventEmitter();
  
  isShow = false;
  hasAmpersand = false;
  hasAmpersAndsubDetails = false;

  showBackBtnFor : Array<string> =[
    '/settings',
    '/choose-destination',
    '/plans',
    '/payment-status',
    '/installation',
    '/rewards',
    '/order-summary'
  ]

  constructor( private location : Location, private router: Router, private browserService : BrowserService){
    const url = location.path();
    this.isShow = this.showBackBtnFor.findIndex((option : string) => url.includes(option)) > -1;
  }

  ngOnInit(): void {
    this.browserService.getIsBrowser().subscribe(isBrowser => {
      if(isBrowser){
        this.rippleEffectAnimation();
      }
    });
	}

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['title']) {
    this.hasAmpersand = changes['title'].currentValue.includes('&');
    }
    if(changes['subDetails']) {
      this.hasAmpersAndsubDetails = changes['subDetails'].currentValue.includes('&');
    }
  }

  goPreviousLocation(){
    if(this.backToRoute && this.backToRoute != this.location.path()){
      this.router.navigate([this.backToRoute]);
    } else if(this.backToRoute == this.location.path()){
      this.backEvent.emit('');
    } else if(this.location.path() == '/installation'){
      this.location.back();
    }
  }

  rippleEffectAnimation(){
    const rippleEffectAnimation = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5
    });


    rippleEffectAnimation.to('#m-circle-1', {
      opacity: 0.14,
      duration: 0.5
    }).to('#m-circle-2', {
      opacity: 0.14,
      duration: 0.5
    })
    .to('#m-circle-3', {
      opacity: 0.14,
      duration: 0.5
    }).to('#m-circle-4', {
      opacity: 0.14,
      duration: 0.5
    }).to('#m-circle-5', {
      opacity: 0.14,
      duration: 0.5
    })
  }
}
