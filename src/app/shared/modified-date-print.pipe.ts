import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifiedDatePrint'
})
export class ModifiedDatePrintPipe implements PipeTransform {

  transform(value: string): string {
    const othersNumber = value.indexOf('T');
    value = value.substr(0, othersNumber);
    return value;
  }

}
