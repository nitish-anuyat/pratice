import { AfterContentInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrowserService, LocalStorageService } from 'src/app/global/service';
import { selectUserDetails } from 'src/app/global/state/user';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterContentInit {

  userDetails$ = this.store.select(selectUserDetails);
  userDetails: any;
  isBrowser  = false;

  // lazy loading variables
  trendingPlanRendered = false;
  eEimRendered = false;
  testimonialsRendered =false;
  mapRendered = false;
  isAllRendered = false;
  showCurrency = true;

  @ViewChild('trendingPlanSection', { read: ViewContainerRef })
    trendingPlanSection!: ViewContainerRef;
  @ViewChild('eSimInfoSection', { read: ViewContainerRef })
    eSimInfoSection!: ViewContainerRef;
  @ViewChild('mapSection', { read: ViewContainerRef })
    mapSection!: ViewContainerRef;
  @ViewChild('testimonialSection', { read: ViewContainerRef })
    testimonialSection!: ViewContainerRef;

  constructor( 
    private browserService :BrowserService,
    private store : Store ,
    private localStorageService : LocalStorageService
  ){
    this.browserService.onScroll().subscribe(
      (event) => this.handleScroll(event)
    )
    this.browserService.getIsBrowser().subscribe( (isBrowser: boolean) => this.isBrowser = isBrowser);
  }

  ngOnInit(): void {
    this.userDetails$.subscribe(details => this.userDetails = details );
	}
  
  ngAfterContentInit(): void {
    const planDetails = JSON.parse(this.localStorageService.getItem('planDetails') || '{}');
    if(planDetails?.scrollPosition && this.isBrowser){
      const element: any = window.document.getElementById('mainScrollContainer');
      if(typeof(element.scrollTop) == 'number') element.scrollTop = planDetails?.scrollPosition;
    }
  }

  public handleScroll(event : any) {
    if(this.isAllRendered || !event?.target){
      return;
    }
    
    const scrollPosition =
      event?.target?.scrollTop + event?.target?.clientHeight + 50;

    const trendingPlanSectionPos =
      this.trendingPlanSection?.element?.nativeElement?.offsetTop;
    
    const eSimInfoSectionPos =
      this.eSimInfoSection?.element?.nativeElement?.offsetTop;

    // const testimonialSectionPos =
    //   this.testimonialSection?.element?.nativeElement?.offsetTop;

    const mapSectionPos =
      this.mapSection?.element?.nativeElement?.offsetTop;

    if(!this.trendingPlanRendered && scrollPosition >= trendingPlanSectionPos) {
      this.trendingPlanRendered = true;
      this.loadTrendingPlan();
    }

    if(!this.eEimRendered && scrollPosition >= eSimInfoSectionPos) {
      this.eEimRendered = true;
      this.loadESimInfo();
    }

    if(!this.testimonialsRendered && scrollPosition >= eSimInfoSectionPos) {
      this.testimonialsRendered = true;
      this.loadTestimonials();
    }

    if(!this.mapRendered && scrollPosition >= mapSectionPos) {
      this.mapRendered = true;
      this.loadMap();
    }
  }

  loadTrendingPlan(){
    this.isAllRendered = this.trendingPlanRendered && this.eSimInfoSection && this.testimonialSection && this.mapRendered;
    import('./component/trending-plan/trending-plan.component').then(
      ({ TrendingPlanComponent }) => {
        this.trendingPlanSection.createComponent(TrendingPlanComponent);
      }
    );
  }

  loadESimInfo(){
    this.isAllRendered = this.trendingPlanRendered && this.eSimInfoSection && this.testimonialSection && this.mapRendered;
    import('./component/e-sim-info/e-sim-info.component').then(
      ({ ESimInfoComponent }) => {
        this.eSimInfoSection.createComponent(ESimInfoComponent);
      }
    );
  }

  loadTestimonials(){
    this.isAllRendered = this.trendingPlanRendered && this.eSimInfoSection && this.testimonialSection && this.mapRendered;
    import('./component/testimonials/testimonials.component').then(
      ({ TestimonialsComponent }) => {
        this.testimonialSection.createComponent(TestimonialsComponent);
      }
    );
  }

  loadMap(){
    this.isAllRendered = this.trendingPlanRendered && this.eSimInfoSection && this.testimonialSection && this.mapRendered;
    import('./component/map-svg/map-svg.component').then(
      ({ MapSvgComponent }) => {
        this.mapSection.createComponent(MapSvgComponent);
      }
    );
  }
}



