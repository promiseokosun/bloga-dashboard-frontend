import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail: any;
  user: any;
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(private authService: AuthService) {
    this.userEmail = localStorage.getItem('user_email');
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }


}
