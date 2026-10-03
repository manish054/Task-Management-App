import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class HardcodedAuthentication {
  constructor(){}
  authenticate(username:string, password:string): boolean{
    console.log("before "+this.isUserLoggedIn());
    
    if(username === "manishBittu54" && password === "12345"){
      sessionStorage.setItem('authenticateUser', username);
      console.log("after "+this.isUserLoggedIn());
      return true;
    }
    return false;

  }

  isUserLoggedIn(): boolean{
    const user = sessionStorage.getItem('authenticateUser'); 
    return !(user == null);
  }

  logout(){
    sessionStorage.removeItem('authenticateUser');
  }
}
