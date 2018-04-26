import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filmRatePrint'
})
export class FilmRatePrintPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'all':
        return '전체 관람가';
      case '12':
        return '12세 관람가';
      case '15':
        return '15세 관람가';
      case '18':
        return '18세 관람가';
      case 'limit':
        return '청소년 관람불가';
      default:
        return '기타';
    }
  }

}
