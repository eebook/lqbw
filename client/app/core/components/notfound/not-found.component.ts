import { Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {}
