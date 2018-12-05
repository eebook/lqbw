import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { DurationPipe } from './duration.pipe';
import { FormatUtcStrPipe } from './format-utc-str.pipe';

export const PIPES = [
  AddCommasPipe,
  EllipsisPipe,
  DurationPipe,
  FormatUtcStrPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
