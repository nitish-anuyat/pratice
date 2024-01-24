import { Component, AfterContentInit } from '@angular/core';
import { BrowserService } from 'src/app/global/service';
import gsap from 'gsap';

@Component({
  selector: 'app-map-svg',
  templateUrl: './map-svg.component.html',
  styleUrls: ['./map-svg.component.scss']
})
export class MapSvgComponent implements AfterContentInit {

  constructor(private browserService : BrowserService){
    
  }

  ngAfterContentInit(): void {
    this.browserService.getIsBrowser().subscribe(isBrowser => {
      if(isBrowser){
        this.mapTimeline();
      }
    });
  }

  mapTimeline(){

    const mapTimeLine = gsap.timeline({
      repeat: -1,
      repeatDelay: 2
    });


    mapTimeLine.to('#w-map-icon-0', {
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-0', { // Icon 1
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-1', {
      opacity: 1,
      duration: 0.5
    })
    .to('#w-map-icon-2', { // Icon 2
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-2', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-2', {
      opacity: 1
    })
    .to('#w-map-icon-3', { // Icon 3
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-3', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-6', {
      opacity: 1,
      duration: 0.5
    })
    .to('#w-map-icon-10', { // Icon 4
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-10', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-12', {
      opacity: 1,
      duration: 0.5
    }, '-=0.4')
    .to('#w-map-icon-9', { // Icon 5
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-9', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-11', {
      opacity: 1,
      duration: 0.5
    }) 
    .to('#w-map-icon-8', { // Icon 6
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-8', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-9', {
      opacity: 1,
      duration: 0.5
    })
    .to('#w-map-icon-7', { // Icon 7
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-7', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    
    .to('#w-map-path-8', {
      opacity: 1,
      duration: 0.5
    })
    .to('#w-map-icon-6', { // Icon 8
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-6', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-7', {
      opacity: 1,
      duration: 0.5
    })
    .to('#w-map-icon-4', { // Icon 9
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-4', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('#w-map-path-4', {
      opacity: 1,
      duration: 0.5
    })
    .to('#w-map-icon-5', { // Icon 10
      opacity: 1,
      duration: 0.5,
      scale: 1.2
    })
    .to('#w-map-icon-5', {
      opacity: 1,
      duration: 0.5,
      scale: 1
    }, '-=0.4')
    .to('.w-map-path-end', {
      opacity: 1,
      duration: 0.5
    })
  }
}
