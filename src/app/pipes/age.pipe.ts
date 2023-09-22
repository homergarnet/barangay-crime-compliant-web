import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      return age - 1;
    }

    return age;
  }
}
