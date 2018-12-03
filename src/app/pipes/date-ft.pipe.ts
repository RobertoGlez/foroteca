import { Pipe, PipeTransform } from '@angular/core';
import * as moment from'moment'

@Pipe({
  name: 'dateFt'
})
export class DateFtPipe implements PipeTransform {

  transform(date: string, args?: any): any {
    let fecha = moment(date).locale('es').format('LL');
    return fecha;
  }

}
