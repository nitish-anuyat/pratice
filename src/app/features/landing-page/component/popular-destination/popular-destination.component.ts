import { Component, Input, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Currency } from 'src/app/global/models';
import { fetchPopularCountries } from 'src/app/global/state/country';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';
import { environment } from 'src/environments/environment';
import gsap from 'gsap';

@Component({
  selector: 'app-popular-destination',
  templateUrl: './popular-destination.component.html',
  styleUrls: ['./popular-destination.component.scss']
})
export class PopularDestinationComponent implements OnDestroy{

  @Input() userDetails : any;

  countries$ = this.store.select(fetchPopularCountries);

  countries: Array<any> = [];

  countriesAssets = `${environment.s3BucketAssets}/countries/`;
  colorGradient = "var(--gradient-1, linear-gradient(173deg, #CBCCFF 100%, rgba(99, 101, 239, 0.00) 100%))";

  position = { x: 0, y: 0 };
  startPosition = this.position;
  activeIndex = 1;
  showAll = false;
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private store: Store, private el: ElementRef, private renderer: Renderer2) {
    this.countries$.pipe(takeUntil(this.destroy$)).subscribe((countriesList: any) => {
      this.countries = countriesList.map((country : any, index: number)=>{
        const imageUrls = [
          '../assets/images/landing-page/uk-card-bg.png',
          '../assets/images/landing-page/aus-card-bg.png',
          '../assets/images/landing-page/ind-card-bg.png',
        ];
        return {
          ... country , 
          // imageUrl :`${this.countriesAssets}${country?.name?.replace(" ", "+")}.png`
          imageUrl : imageUrls[index % imageUrls.length],
        }
      });
    });
    this.defaultCurrency$.pipe(takeUntil(this.destroy$)).subscribe((currency: any) => { 
      if(currency) this.defaultCurrency = currency;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    if(this.destroy$?.complete) this.destroy$.complete();
    if(this.destroy$?.unsubscribe) this.destroy$.unsubscribe();
  }

  trackCountries(index: any, item : any) {
    return item._id;
  }

  onDragStart(event: any) {
    if(event.type == "touchstart"){
      this.startPosition = {
        x: event?.changedTouches[0]?.clientX - this.position.x,
        y:  event?.changedTouches[0]?.clientY - this.position.y
      };
    }else {
      this.startPosition = {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y
      };
    }
  }

  onDragEnd(event: any) {
    const currentPosition = event.type == "touchend" ? event?.changedTouches[0] : event;
    if(currentPosition?.clientX < this.startPosition.x && this.activeIndex < 2){
      this.activeIndex++;
    }else if(currentPosition?.clientX > this.startPosition.x && this.activeIndex > 0) {
      this.activeIndex--;
    }
    this.startPosition = { x: 0, y: 0 };
  }


  focusedCardIndex: number | null = null;

  onCardClick(index: number): void {
    this.focusedCardIndex = index;
    const divElement = this.el.nativeElement.querySelector('.card-row');
    const currentStyle = window.getComputedStyle(divElement);
    
    

    let cardTimeline = gsap.timeline();

    if(window.innerWidth <= 767){
      if(this.focusedCardIndex === 2){
        cardTimeline.to('.card-row', {
          left: '-25%',
          duration: 1,
          ease: "power1.out",
        }).to('.card-style:nth-child(2)', {
          transform: 'scale(1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1').to('.card-style:nth-child(3)', {
          transform: 'scale(1.1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1')
      }else if(this.focusedCardIndex === 0){
        cardTimeline.to('.card-row', {
          left: '128%',
          duration: 1,
          ease: "power1.out",
        }).to('.card-style:nth-child(2)', {
          transform: 'scale(1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1').to('.card-style:nth-child(1)', {
          transform: 'scale(1.1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1')
      }else if(this.focusedCardIndex === 1 || currentStyle.left === '183px'){
        cardTimeline.to('.card-row', {
          left: '50%',
          duration: 1,
          ease: "power1.out",
        }).to('.card-style:nth-child(2)', {
          transform: 'scale(1.1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1').to('.card-style:nth-child(1)', {
          transform: 'scale(1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1').to('.card-style:nth-child(3)', {
          transform: 'scale(1)',
          duration: 1,
          ease: "power1.out",
        }, '-=1')
      }
    }
    
  }
}
