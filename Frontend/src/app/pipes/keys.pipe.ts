import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let entry = JSON.parse(value);
    let keys = [];
    for (let key in entry) {
      
      keys.push({key: key, value: entry[key]});
    }
    return keys;
  }

}
