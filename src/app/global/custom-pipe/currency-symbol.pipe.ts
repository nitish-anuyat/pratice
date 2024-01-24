import { getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(value: string, format: 'wide' | 'narrow' = 'wide'): string {
    if(!value) return '';
    return getCurrencySymbol(value, format);
  }
}
