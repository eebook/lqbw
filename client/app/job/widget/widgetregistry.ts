import { StringWidgetComponent } from './string/string.widget';
import { DefaultWidgetRegistry } from 'angular2-schema-form';

export class MyWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('string',  StringWidgetComponent);
  }
}
