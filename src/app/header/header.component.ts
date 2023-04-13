import { Component } from '@angular/core';
import { Router, NavigationEnd  } from "@angular/router";
import { AuthService } from '../emp/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authListenerSubs!: Subscription
  constructor(private router: Router , public authService : AuthService) { }
  pageUrl = '';
  userIsAuthenticated = false;
  signedIn = false;
  ngOnInit(){
    this.router.events.subscribe((event) => {event instanceof NavigationEnd ?
      this.setPageUrl(event.url)
      //console.log(event.url)
      : null});
    this.authListenerSubs = this. authService
    .geAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated =isAuthenticated;
    });
  }

  setPageUrl(url : string){
    this.pageUrl = url;
    this.signedIn = this.pageUrl === '/login';
  }

  onLogOut(){
    this.authService.logOut();
  }

}
