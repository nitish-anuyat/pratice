import { Component, OnInit } from '@angular/core';
import { BrowserService } from 'src/app/global/service';
import gsap from 'gsap';

@Component({
  selector: 'app-e-sim-info',
  templateUrl: './e-sim-info.component.html',
  styleUrls: ['./e-sim-info.component.scss']
})
export class ESimInfoComponent implements OnInit {

  constructor(private browserService: BrowserService) { }

  ngOnInit(): void {
    this.browserService.getIsBrowser().subscribe(isBrowser => {
      if (isBrowser) {
        this.useEsimTimeline();
      }
    });
  }

  useEsimTimeline() {
    const useEsimTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 4
    });

    useEsimTimeline.to('#iPhonePlanImg', { //First Change
      opacity: 1,
      duration: 1,
      delay: 1,
      ease: "power1.out",
    }).to('#iPhonePlanTextGroup', {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
    }, '-=1').to('#iPhoneDestinationImg', {
      opacity: 0,
      duration: 1,
      ease: "power1.out",
    }, '-=1').to('#iPhoneDestinationTextGroup', {
      opacity: 0,
      duration: 1,
      ease: "power1.out",
    }, '-=1')
      .to('#iPhoneQrCodeImg', {//Second Change
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power1.out",
      }).to('#iPhonePlanImg', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhonePlanTextGroup', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneQrCodeImg', {
        left: '70%',
        duration: 1,
        ease: "power1.out",
      }, '-=0.75').to('#iPhoneQrCodeTextGroup', {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }, '-=1')
      .to('#iPhoneDashboardImg', { // Third Change
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power1.out",
      }).to('#iPhoneQrCodeImg', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneQrCodeTextGroup', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneDashboardHeading', {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneDashboardText', {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneDashboardImg', {
        left: () => {
          if (window.matchMedia('(max-width: 991px)').matches) {
            return '42.5%';
          } else {
            return '50%';
          }
        },
        duration: 1,
        ease: "power1.out",
      }, '-=1')
      .to('#downloadAppTextGroup', { // Fourth Change
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power1.out",
      }).to('#iPhoneDashboardHeading', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneDashboardText', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#iPhoneDashboardImg', {
        left: () => {
          if (window.matchMedia('(max-width: 991px)').matches) {
            return '35%';
          } else {
            return '45%';
          }
        },
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#eSimSecondHeading', {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }, '-=1').to('#eSimFirstHeading', {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }, '-=1')

    // gsap.registerEffect({
    //   name: "fade",
    //   effect: (targets : any, config : any) => {
    //       return gsap.to(targets, {duration: config.duration, opacity: 0});
    //   },
    //   defaults: {duration: 2}, 
    //   extendTimeline: true,
    // });

    // useEsimTimeline
    // .from('#eSIMSection2', {
    //   display: "none",
    //   opacity: 0,
    //   duration: 0
    // })
    // .from('#eSIMSection1', {
    //   display: "block",
    //   opacity: 1,
    //   duration: 0
    // })
    // .from('#useESIM1, #useESIM2, #useESIM3, #useESIM4', {
    //   opacity: 0,
    //   duration: 0,
    // })
    // .to('#useESIM1', {
    //   opacity: 1,
    //   duration: 2,
    // })
    // .from('.phone-img-1', {
    //   x: '0%',
    //   duration: 0,
    //   opacity: 0.5
    // },)
    // .to('.phone-img-1', {
    //   x: '100%',
    //   duration: 2,
    //   opacity: 1
    // },)
    // ['fade']('#useESIM1')
    // .to('.phone-img-1', {
    //   scale: 0.9,
    //   duration: 2
    // },'-=2')
    // .to('#useESIM2', {
    //   duration: 2,
    //   opacity: 1
    // },'-=2')
    // ['fade']('#useESIM2', {
    //   duration: 5
    // })
    // .to('#useESIM3', {
    //   duration: 2,
    //   opacity: 1
    // },'-=2')
    // .to('.phone-img-3', {
    //   x: '60%',
    //   duration: 3,
    // }, '-=1.5')
    // ['fade']('#useESIM3')
    // .to('#useESIM4', {
    //   opacity: 1,
    //   duration: 2,
    // }, '-=2')
    // .from('.phone-img-4', {
    //   x: '100%',
    //   duration: 0.1,
    // }, '-=3')
    // .to('.phone-img-4', {
    //   x: '0%',
    //   duration: 2,
    // })
    // ['fade']('#eSIMSection1', '+=2')
    // .to('#eSIMSection1 .web-use-esim-container', {
    //   y: '-10%',
    //   duration: 0
    // }, '-=2')
    // .to('#eSIMSection2', {
    //   display: "block",
    //   opacity: 1,
    //   duration: 1
    // }, '-=1.5')
    // .to('#eSIMSection2 .phone-img', {
    //   x: '-30%',
    //   opacity: 1,
    //   duration: 2
    // }, '-=1.5');
  }

  // useEsimTimeline(){
  //   const useEsimTimeline = gsap.timeline({
  //     repeat: -1,
  //     repeatDelay: 5
  //   });

  //   gsap.registerEffect({
  //     name: "fade",
  //     effect: (targets : any, config : any) => {
  //         return gsap.to(targets, {duration: config.duration, opacity: 0});
  //     },
  //     defaults: {duration: 2}, 
  //     extendTimeline: true,
  //   });

  //   useEsimTimeline
  //   .from('#eSIMSection2', {
  //     display: "none",
  //     opacity: 0,
  //     duration: 0
  //   })
  //   .from('#eSIMSection1', {
  //     display: "block",
  //     opacity: 1,
  //     duration: 0
  //   })
  //   .from('#useESIM1, #useESIM2, #useESIM3, #useESIM4', {
  //     opacity: 0,
  //     duration: 0,
  //   })
  //   .to('#useESIM1', {
  //     opacity: 1,
  //     duration: 2,
  //   })
  //   .from('.phone-img-1', {
  //     x: '0%',
  //     duration: 0,
  //     opacity: 0.5
  //   },)
  //   .to('.phone-img-1', {
  //     x: '100%',
  //     duration: 2,
  //     opacity: 1
  //   },)
  //   ['fade']('#useESIM1')
  //   .to('.phone-img-1', {
  //     scale: 0.9,
  //     duration: 2
  //   },'-=2')
  //   .to('#useESIM2', {
  //     duration: 2,
  //     opacity: 1
  //   },'-=2')
  //   ['fade']('#useESIM2', {
  //     duration: 5
  //   })
  //   .to('#useESIM3', {
  //     duration: 2,
  //     opacity: 1
  //   },'-=2')
  //   .to('.phone-img-3', {
  //     x: '60%',
  //     duration: 3,
  //   }, '-=1.5')
  //   ['fade']('#useESIM3')
  //   .to('#useESIM4', {
  //     opacity: 1,
  //     duration: 2,
  //   }, '-=2')
  //   .from('.phone-img-4', {
  //     x: '100%',
  //     duration: 0.1,
  //   }, '-=3')
  //   .to('.phone-img-4', {
  //     x: '0%',
  //     duration: 2,
  //   })
  //   ['fade']('#eSIMSection1', '+=2')
  //   .to('#eSIMSection1 .web-use-esim-container', {
  //     y: '-10%',
  //     duration: 0
  //   }, '-=2')
  //   .to('#eSIMSection2', {
  //     display: "block",
  //     opacity: 1,
  //     duration: 1
  //   }, '-=1.5')
  //   .to('#eSIMSection2 .phone-img', {
  //     x: '-30%',
  //     opacity: 1,
  //     duration: 2
  //   }, '-=1.5');
  // }
}
