import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {

  private assetsUrl  = 'assets/images/landing-page/';
  testimonialsData: Array<any> = [
    {
      title: 'landing.testimonials.excellent',
      details: '',
      imgUrl: `${this.assetsUrl}testimonials-1.webp`
    },
    {
      title: 'landing.testimonials.overjoyed',
      details: '',
      imgUrl: `${this.assetsUrl}testimonials-2.webp`
    },
    {
      title: 'landing.testimonials.wonderful',
      details: '',
      imgUrl: `${this.assetsUrl}testimonials-3.webp`
    }
  ];
  activeTestimonial = 0;

}
