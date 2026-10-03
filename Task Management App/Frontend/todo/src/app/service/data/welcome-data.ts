import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelloWorldBean } from '../../welcome/welcome';

@Injectable({
  providedIn: 'root',
})
export class WelcomeData {
  constructor(private http: HttpClient){}

  executeHelloWorldBeanService(){
    // console.log("executeHelloWorldBeanService");
    return this.http.get<HelloWorldBean>('http://localhost:8080/welcome/manish')
  }
}
