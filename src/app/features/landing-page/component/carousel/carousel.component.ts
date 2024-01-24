import { Component, ElementRef, QueryList, ViewChildren, OnDestroy, OnInit } from '@angular/core';
import { BrowserService } from 'src/app/global/service';
import { interval } from 'rxjs';
import { ConfigService } from 'src/app/global/service/config.service';
import gsap from 'gsap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnDestroy, OnInit{


  @ViewChildren("carouselItem") carouselItem!: QueryList<ElementRef>
  constructor(private browserService : BrowserService, private configService : ConfigService){
    browserService.getIsBrowser().subscribe( (isBrowser) => {
      if(isBrowser)
        this.carouselInterval = interval(3990).subscribe(() => {
          this.currentScreenIndex = this.currentScreenIndex == 3 ? 1 : (this.currentScreenIndex + 1)
        });
      }
    )

    configService.getLocalConfig().subscribe((configData : any) => {
      if(configData?.currencyConversionMasterEnabled){
        this.showCurrency = true;
      }
    });
  }
 
  carouselInterval: any;
  currentScreenIndex  = 1;
  showCurrency = false;

  ngOnInit(): void {
    this.browserService.getIsBrowser().subscribe(isBrowser => {
      if(isBrowser){
        // this.rippleEffectAnimation();
        this.carousalAnimation();
      }
    });
	}


  ngOnDestroy(): void {
    if(this.carouselInterval){
      this.carouselInterval.unsubscribe();
    }
  }


  // rippleEffectAnimation(){
  //   const rippleEffectAnimation = gsap.timeline({
  //     repeat: -1,
  //     repeatDelay: 0.5
  //   });


  //   rippleEffectAnimation.to('#m-circle-1', {
  //     opacity: 1,
  //     duration: 0.5
  //   }).to('#m-circle-2', {
  //     opacity: 1,
  //     duration: 0.5
  //   })
  //   .to('#m-circle-3', {
  //     opacity: 1,
  //     duration: 0.5
  //   }).to('#m-circle-4', {
  //     opacity: 1,
  //     duration: 0.5
  //   }).to('#m-circle-5', {
  //     opacity: 1,
  //     duration: 0.5
  //   })
  // }

  carousalAnimation(){
    gsap.timeline({
      repeat: -1,
      repeatDelay: 1
    }).to('#carouselItemRow', {
      left: () => {
        if (window.matchMedia('(max-width: 575px)').matches){
          return '-56.5%'
        } else if (window.matchMedia('(max-width: 991px)').matches){
          return '-50%'
        } else if (window.matchMedia('(max-width: 1399px)').matches){
          return '-25%'
        } else if(window.matchMedia('(max-width: 1439px)').matches){
          return '-17%'
        } else {
          return '-10%'
        }
      },
      duration: 2,
      ease: "power1.out",
    }).to('#carouselItemThird', {
      transform: 'scale(1.1)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#carouselItemSecond', {
      transform: 'scale(1)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#indicatorThird', {
      width:() => {
        if(window.matchMedia('(max-width: 1199px)').matches){
          return '30px'
        } else {
          return '47px'
        }
      },
      backgroundColor: 'var(--color-primary)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#indicatorSecond', {
      width:() => {
        if(window.matchMedia('(max-width: 1199px)').matches){
          return '8px'
        } else {
          return '12px'
        }
      },
      backgroundColor: '#B1B1B1',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5')
    .to('#carouselItemRow', {
      left: () => {
        if (window.matchMedia('(max-width: 575px)').matches){
          return '156.5%'
        } else if (window.matchMedia('(max-width: 991px)').matches){
          return '150%'
        } else if (window.matchMedia('(max-width: 1399px)').matches){
          return '125%'
        } else if(window.matchMedia('(max-width: 1439px)').matches){
          return '116.5%'
        } else {
          return '110%';
        }
      },
      duration: 2,
      delay: 1,
      ease: "power1.out",
    }).to('#carouselItemThird', {
      transform: 'scale(1)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#carouselItemFirst', {
      transform: 'scale(1.1)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#indicatorFirst', {
      width:() => {
        if(window.matchMedia('(max-width: 1199px)').matches){
          return '30px'
        } else {
          return '47px'
        }
      },
      backgroundColor: 'var(--color-primary)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#indicatorThird', {
      width:() => {
        if(window.matchMedia('(max-width: 1199px)').matches){
          return '8px'
        } else {
          return '12px'
        }
      },
      backgroundColor: '#B1B1B1',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5')
    .to('#carouselItemRow', {
      left: '50%',
      duration: 2,
      delay: 1,
      ease: "power1.out",
    }).to('#carouselItemFirst', {
      transform: 'scale(1)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#carouselItemSecond', {
      transform: 'scale(1.1)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#indicatorSecond', {
      width:() => {
        if(window.matchMedia('(max-width: 1199px)').matches){
          return '30px'
        } else {
          return '47px'
        }
      },
      backgroundColor: 'var(--color-primary)',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5').to('#indicatorFirst', {
      width:() => {
        if(window.matchMedia('(max-width: 1199px)').matches){
          return '8px'
        } else {
          return '12px'
        }
      },
      backgroundColor: '#B1B1B1',
      duration: 0.5,
      ease: "power1.out",
    }, '-=0.5')
  }
}
