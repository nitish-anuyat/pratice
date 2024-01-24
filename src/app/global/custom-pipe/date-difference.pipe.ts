import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer, private translateService: TranslateService) {
    this.translateService.get(['plans.day', 'plans.days', 'plans.minute', 'plans.minutes', 'plans.hour', 'plans.hours', 'plans.expired', 'plans.today', 'plans.ago', 'plans.remaining'])
    .subscribe((translations : any) => {
      this.translations = translations;
    })
  }
  private translations : any = [];
  transform(endDate: Date): SafeHtml {

    const currentDate = new Date();
    const timeDifference = new Date(endDate).getTime() - currentDate.getTime();

    // Calculate the number of days in the difference
    const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));

    // Calculate the number of hours in the difference
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));

    // Calculate the number of minutes in the difference
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let message: string;

    switch (true) {
      case hours > 24:
        message = `<span class="validity-text fw-bold">${remainingDays} ${remainingDays === 1 ? this.translations['plans.day'] : this.translations['plans.days']}</span> ${this.translations['plans.remaining']}`;
        break;
      case hours > 1 && hours < 24:
        message = `<span class="validity-text fw-bold">${hours} ${hours === 1 ? this.translations['plans.hour'] : this.translations['plans.hours']}</span> ${this.translations['plans.remaining']}`;
        break;
      case minutes > 0 && minutes < 60:
        message = `<span class="validity-text fw-bold">${minutes} ${minutes === 1 ? this.translations['plans.minute'] : this.translations['plans.minutes']}</span> ${this.translations['plans.remaining']}`;
        break;
      case hours === 24:
        message = `<span class="validity-text fw-bold">${this.translations['plans.expired']}</span> ${this.translations['plans.today']}`;
        break;
      default:
        message = `<span class="validity-text fw-bold">${this.translations['plans.expired']} ${Math.abs(remainingDays)} ${Math.abs(remainingDays) === 1 ? this.translations['plans.day'] : this.translations['plans.days']}</span> ${this.translations['plans.ago']}`;
    }

    const html = message;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
