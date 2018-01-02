import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(milliseconds: number) {
    let message = '';
    if (milliseconds >= 1000) {
      const duration = moment.duration(milliseconds);

      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      message += days ? days + ' day ' : '';
      message += hours ? hours + ' hour ' : '';
      message += minutes ? minutes + ' minute ' : '';
      message += seconds ? seconds + ' second ' : '';
    } else if (milliseconds > 0) {
      message = ' less_than_a_second';
    } else {
      message = '-';
    }

    return message;
  }
}
