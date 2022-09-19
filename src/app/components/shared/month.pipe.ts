import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
})
export class MonthPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const date = new Date();
    date.setMonth(value - 1);
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
}
