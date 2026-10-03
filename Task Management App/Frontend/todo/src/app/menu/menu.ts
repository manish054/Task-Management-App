import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HardcodedAuthentication } from '../service/hardcoded-authentication';
import { AuthenticationService } from '../service/authentication-service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{
  isUserLoggedIn:boolean = false;
  constructor(public authenticationService: AuthenticationService){
    
  }
   
  ngOnInit(): void {
      
  }

}
