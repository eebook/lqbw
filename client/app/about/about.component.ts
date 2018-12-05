import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutInfo: string;

  constructor(
    private _aboutService: AboutService,
    private _loadingService: TdLoadingService,
  ) { }

  async ngOnInit() {
    await this.load();
  }

  async load(): Promise<void> {
    try {
      const response = await this._aboutService.getAbout().toPromise();
      this.aboutInfo = response.json()['title'] + '\n\n' + response.json()['content'];
    } catch (error) {
    } finally {
    }
  }

}
