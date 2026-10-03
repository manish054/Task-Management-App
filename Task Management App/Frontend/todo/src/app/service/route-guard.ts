import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HardcodedAuthentication } from './hardcoded-authentication';

@Injectable({
  providedIn: 'root',
})

export class RouteGuard implements CanActivate{

  constructor(private router:Router, 
    private hardcodedAuthentication: HardcodedAuthentication){
      // console.log('RouteGuard initialized');
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree{
    // console.log('Access denied. Redirecting from:',state.url);

    //this is for hardcoded authentication
    // if(this.hardcodedAuthentication.isUserLoggedIn()){
    //   console.log('this.hardcodedAuthentication.isUserLoggedIn()--'+this.hardcodedAuthentication.isUserLoggedIn());
      
    //   return true;
    // }
      
    // console.log('Access denied. Redirecting to Login: ',state.url);
    const token = sessionStorage.getItem("token");
    if(token){
      return true;
    }

    this.router.createUrlTree(['login']);
    return false;
  }
}
