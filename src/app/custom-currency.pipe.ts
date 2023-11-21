import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'USD'): string {
    const formattedValue = (value / 100).toFixed(2);
    return `${currencyCode} ${formattedValue}`;
  }
}
