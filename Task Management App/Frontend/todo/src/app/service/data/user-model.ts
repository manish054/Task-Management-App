import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserModel {
  username:string = '';
  password:string = '';
  constructor(){}
}
