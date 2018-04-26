import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dDayPrint'
})
export class DDayPrintPipe implements PipeTransform {

  transform(value: string): string {
    function formatDate() {
      const d = new Date();
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('');
    }

    const dday = +value.split('-').join('');
    const today = +formatDate();
    if ( dday - today > 0 ) {
      value = `-${Math.abs(dday - today)}`;
    } else if ( dday - today < 0 ) {
      value = `+${Math.abs(dday - today)}`;
    } else {
      value = '-day';
    }
    return `D ${value}`;
  }

}
