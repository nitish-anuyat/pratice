import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  template: `
      <ng-lottie [options]="options" width="320px"></ng-lottie>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  options: AnimationOptions = {    
    path: '/assets/loader/gb-loader.json'
  };  

}
