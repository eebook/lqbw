import { AuthService } from './common/auth.service';
import { Component, HostListener, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Message } from 'primeng/primeng';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public msgs: Message[] = [];
  private globalClickCallbackFn: Function;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  public doLogout(): void {
    this.authService.logout();
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Successfully log out'
    });
    this.router.navigateByUrl('');
  }

  changeLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
