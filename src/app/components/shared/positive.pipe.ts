import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positive',
})
export class PositivePipe implements PipeTransform {
  transform(value: number | string | null, ...args: unknown[]): string {
    let newval = 0;
    let add = false;
    if (value === null) {
      return '';
    }
    if (typeof value === 'string') {
      newval = parseInt(value);
    } else {
      newval = value;
    }
    if (newval > 0) {
      add = true;
    }
    return add ? `+${value}` : `${value}`;
  }
}
