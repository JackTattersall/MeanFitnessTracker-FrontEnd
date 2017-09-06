import { Pipe, PipeTransform } from '@angular/core';
/*
 * Capitalise the first letter of the string
 *
*/
@Pipe({name: 'titalise'})
export class TitalisePipe implements PipeTransform {
  transform(value: string): string {
    if(value)
      return value.charAt(0).toUpperCase() + value.slice(1);
    else
      return value
  }
}
