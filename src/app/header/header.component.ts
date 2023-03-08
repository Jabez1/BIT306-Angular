import { Component } from '@angular/core';
import { Router, NavigationEnd  } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router ) { }
  pageUrl = '';
  signedIn = false;
  ngOnInit(){
    this.router.events.subscribe((event) => {event instanceof NavigationEnd ?
      this.setPageUrl(event.url)
      //console.log(event.url)
      : null});
  }

  setPageUrl(url : string){
    this.pageUrl = url;
    this.signedIn = this.pageUrl === '/login';
  }


}
