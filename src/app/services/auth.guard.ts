import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
  // return inject(AuthService).isLoggedInGuard ? true : inject(Router).createUrlTree(['/login']);
  if(inject(AuthService).isLoggedInGuard) return true;
  inject(ToastrService).warning('Please login to access resource', 'Unauthorized Access!');
  return inject(Router).createUrlTree(['/login']);
};
