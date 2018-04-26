import { Pipe, PipeTransform } from '@angular/core';
import { Member } from './member.interface';

@Pipe({
  name: 'membersFilter'
})
export class MembersFilterPipe implements PipeTransform {

  transform(members: Member[], type?: string): Member[] {
    return members.filter(member => {
      switch (type) {
        case 'director':
          return member.type === '감독';
        case 'leadingRole':
          return member.type === '주연';
        case 'SupportingRole':
          return member.type === '조연';
        default:
          return member;
      }
    });
  }

}
