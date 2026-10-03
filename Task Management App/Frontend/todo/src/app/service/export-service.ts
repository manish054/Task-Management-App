import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ExportService {
  
  constructor(private http:HttpClient){}
  exportToExcel(username:string){
    return this.http.get(`http://localhost:8080/user/${username}/todos/tracker/export`,
      {responseType:'blob'}
    );
  }
}
