import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthentication } from '../service/hardcoded-authentication';
import { AuthenticationService } from '../service/authentication-service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout implements OnInit{
  constructor(private router:Router, private authenticationService: AuthenticationService){
  }

  ngOnInit(): void {
      this.authenticationService.logOut();
      // this.router.navigate(['login']);
  }
}
