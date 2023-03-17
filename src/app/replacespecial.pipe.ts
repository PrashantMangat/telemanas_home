import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'specialPipe'
})
export class specialPipe implements PipeTransform {

  transform(value: string): string {
    const newVal = value.replace(/[^\w\s,."'()%@#&]/gi, '');
    // return this.titleCase(newVal);
    return newVal;
  }

}
