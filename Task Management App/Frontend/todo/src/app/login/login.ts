import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodedAuthentication } from '../service/hardcoded-authentication';
import { UserModel } from '../service/data/user-model';
import { AuthenticationService } from '../service/authentication-service';

export class UserLoginResponse{
  username:string = ''
  authenticated: boolean = false;
  jwtToken: string = ''
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone:true
})


export class Login implements OnInit{
  username : string = '';
  password : string = '';
  userModel: UserModel = new UserModel()
  invalidLogin = signal<boolean>(false);
  message : string = '';
  constructor(private router: Router, 
    private hardcodedAuthentication:HardcodedAuthentication,
    private authenticationService:AuthenticationService,
    private activatedRoute: ActivatedRoute
  ){
    console.log("Contructor called");
    console.log("router---", router);
    
  }

  ngOnInit(): void {
      console.log("on init");
      
  }

  handleLogin(): void{
    // console.log(this.username);
    console.log("Handle Login Method");
    console.log("username--",this.username);
    console.log("password--",this.password);
    
    this.userModel.username = this.username;
    this.userModel.password = this.password;
    
    
    this.authenticationService.getAuthenticate(this.userModel).subscribe({
      next: (res:UserLoginResponse) => {
        console.log("res--",res);
        console.log("res--"+res.username+"-"+res.authenticated);
        if(res.authenticated){
          sessionStorage.setItem("token", res.jwtToken)
          sessionStorage.setItem("authenticateUser", res.username)
          console.log("Before navigation");
          this.router.navigate(['welcome', res.username]).then(success => {
          console.log("Navigation success:", success);
         });
          // this.router.navigate(['welcome', res.username])
        }else{
          this.invalidLogin.set(true);
        }
      },
      error: (err) =>{
        console.log("Error in getAuthenticate--",err);
        
      }
    })
    

    // if(this.hardcodedAuthentication.authenticate(this.username, this.password)){
    //   this.router.navigate(['welcome', this.username])
    // }else{
    //   this.validLogin = !this.validLogin;
    // }
      
      
    
  }
}
