import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from '../service/sign-service';

export class SignUpResponse{
  constructor(public name:string, public email:string, 
    public password:string, public role:string, public emailVerified:boolean, 
    public enabled:boolean){}
}


@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  standalone: true
})

export class SignUp {
  username:string=''
  email:string=''
  password:string=''
  confirmPassword:string=''
  role:string= ''
  passwordMatched:boolean = true;
  emailVerified:boolean = false;
  enabled:boolean = false;
  usernameExists = signal<boolean>(false);
  emailExists = signal<boolean>(false);
  signUpResponse: SignUpResponse = new SignUpResponse(this.username, this.email, this.password, this.role, this.emailVerified, this.enabled)
  constructor(private router:Router, private signUpService: SignService){}

  signUp(){
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
    if(this.password != this.confirmPassword){
      this.passwordMatched = false;
    }else{
      this.signUpResponse.name = this.username
      this.signUpResponse.email = this.email
      this.signUpResponse.password = this.password
      this.signUpResponse.role = 'user'
      this.signUpResponse.emailVerified = this.emailVerified

      this.signUpService.signUp(this.signUpResponse).subscribe({
        next: (res) => {
          console.log("response---",res);
          this.router.navigate(['/verify']);
        },
        error: (err) => {
          if(err.status == 403){
            this.usernameExists.set(true)
            this.emailExists.set(true)
          }
          console.log("this.usernameExists--",this.usernameExists);
          console.log("this.emailExists--",this.emailExists);
          console.log("Error---",typeof(err.status));
          
        }
      })
    }
  }
}
