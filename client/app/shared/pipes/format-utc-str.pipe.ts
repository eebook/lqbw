import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Format a UTC string.
 */
@Pipe({ name: 'formatUtcStr' })
export class FormatUtcStrPipe implements PipeTransform {
  transform(utcStr: string): string {
    if (!utcStr) {
      return '-';
    }
    return moment(moment.utc(utcStr).valueOf()).format('YYYY-MM-DD HH:mm:ss');
  }
}
