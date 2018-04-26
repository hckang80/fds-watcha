import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationPrint'
})
export class NationPrintPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'KR':
        return '한국';
      case 'JP':
        return '일본';
      case 'CH':
        return '중국';
      case 'US':
        return '미국';
      case 'HK':
        return '홍콩';
      case 'GB':
        return '영국';
      case 'FR':
        return '프랑스';
      case 'GM':
        return '독일';
      case 'IT':
        return '이탈리아';
      case 'TH':
        return '태국';
      default:
        return '기타';
    }
  }

}
