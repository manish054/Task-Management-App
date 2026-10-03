import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmail implements OnInit{
  constructor(private http:HttpClient){}

  ngOnInit(): void {
      this.verifyMail().subscribe(
        {
          next: (res) => {console.log("response::: ",res);},
          error: (err) => {console.log("error::: ",err);
          }
          
        }
      )
  }
  verifyMail(){
    return this.http.get('http://localhost:8080/verify');
  }
}
