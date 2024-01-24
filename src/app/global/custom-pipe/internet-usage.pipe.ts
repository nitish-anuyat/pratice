import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'internetUsage'
})
export class InternetUsagePipe implements PipeTransform {

  // transform(bytes: number, threshold: number = 1024 * 1024): string {
  //   if (bytes > threshold) {
  //     return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  //   } else {
  //     return `${(bytes / 1024).toFixed(0)} GB`;
  //   }
  // }

  transform(used: number, totalUsage: number): string {
    let displayText = '';

    if (used >= 1024) {
      const totalData = totalUsage >= 1024 ? totalUsage / 1024 : totalUsage ;
      const usedData = used / 1024
      displayText = `${usedData.toFixed(2)} GB / ${totalData.toFixed(2)}`;
    } else {
      const totalData = totalUsage >= 1024 ? totalUsage / 1024 : totalUsage;
      displayText = `${used} MB / ${totalData}`;
    }

    return `${displayText} ${totalUsage >= 1024 ? 'GB' : 'MB'}`;
  }
  
}
