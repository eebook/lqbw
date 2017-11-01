import { HttpService } from './http.service';
import { Component, OnInit, HostListener } from '@angular/core';


/**
 * Captcha img element.
 */
@Component({
  selector: 'app-lqbw-captcha-img',
  templateUrl: 'captcha-img-component.html',
  styles: [`
    :host {
      display: block;
      cursor: pointer;
    }
    img {
      height: 100%;
    }
    .hidden {
      display: none;
    }
  `]
})

export class CaptchaImgComponent implements OnInit {
  captchaSrc = '/ajax/captcha-image/';
  refreshing = false;

  @HostListener('click')
  onClick() {
    this.refresh();
  }

  constructor(
    private _http: HttpService,
  ) {

  }

  refresh() {
    if (!this.refreshing) {
      this.refreshing = true;
      this._http.request('/ajax/captcha-refresh').then(({ image_url }) => {
        this.captchaSrc = image_url;
        return image_url;
      }).catch(() => {
        console.log('Failed to refresh captcha');
      }).then(() => {
        this.refreshing = false;
      });
    }
  }

  refreshTooltip() {
    return 'Click to refresh';
  }

  ngOnInit() {
    this.refresh();
  }
}

