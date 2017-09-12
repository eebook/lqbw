import { AuthService } from './common/auth.service';
import { Component, HostListener, ElementRef, Renderer, ViewContainerRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { User } from './user/model/user-model';
import { Message } from 'primeng/primeng';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public msgs: Message[] = [];
  public currentUser: User;
  private globalClickCallbackFn: Function;

  constructor(
    public authService: AuthService,
    public elementRef: ElementRef,
    public router: Router,
    public renderer: Renderer,
  ) {}

  ngOnInit() {
    this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
      console.log('Global listening event: ' + event);
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser) {
      console.log('currentUser is None');
    } else {
      console.log('currentUser: ' + this.currentUser.userName);
    }
  }

  public doLogout(): void {
    this.authService.logout();
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Successfully log out'
    });
    // TODO: navigate to index
    this.router.navigate(['bookstore']);
  }

  changeLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
