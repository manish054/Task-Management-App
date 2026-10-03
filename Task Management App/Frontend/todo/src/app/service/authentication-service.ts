import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './data/user-model';
import { UserLoginResponse } from '../login/login';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  constructor(private http: HttpClient){}

  getAuthenticate(userModel: UserModel){
    console.log(userModel.username,"***",userModel.password);
    return this.http.post<UserLoginResponse>("http://localhost:8080/login", userModel);
  }

  isLoggedIn(): boolean{
    const token = sessionStorage.getItem("token");
    if(token != null){
      return true;
    }
    return false;
  }

  logOut(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authenticateUser")
  }


}
