import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuthService: AngularFireAuth,
              private toastrService: ToastrService) { }

  login(email: string, password: string)  {
    this.fireAuthService.signInWithEmailAndPassword(email, password).then(value => {
       this.toastrService.success('Login Successfully')
    });
  }
}
