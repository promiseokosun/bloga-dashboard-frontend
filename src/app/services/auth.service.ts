import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard = false;

  constructor(private fireAuthService: AngularFireAuth,
              private toastrService: ToastrService, private router: Router) { }

  login(email: string, password: string)  {
    this.fireAuthService.signInWithEmailAndPassword(email, password).then(value => {
      this.loadUser();
      this.toastrService.success('Login Successfully');
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['']);
    }).catch(reason => {
      this.toastrService.warning('Invalid Login Credentials..!')
    })
  }

  loadUser() {
    this.fireAuthService.authState.subscribe(value => {
      localStorage.setItem('user_email', JSON.parse(JSON.stringify(value?.email)));
      // localStorage.setItem('user', JSON.parse(JSON.stringify(value)));
    })
  }
  logout() {
    this.fireAuthService.signOut().then(value => {
      localStorage.removeItem('user_email');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}

