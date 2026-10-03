import { Injectable } from '@angular/core';
import { SignUpResponse } from '../sign-up/sign-up';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class SignService {
  constructor(private http:HttpClient){}

  signUp(signUpResponse:SignUpResponse){
    return this.http.post('http://localhost:8080/register', signUpResponse);
  }

}
