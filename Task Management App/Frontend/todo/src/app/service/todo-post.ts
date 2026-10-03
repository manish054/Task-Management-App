import { Injectable } from '@angular/core';
import { Todos } from '../list-todos/list-todos';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TodoPost {
  username: string = sessionStorage.getItem('authenticateUser')!;
  todo : Todos = new Todos(0, '', false, '', false)
  constructor(private http: HttpClient){}

  postTodo(todo: Todos){
    console.log("todo.done--",todo.done);
    
    console.log(`http://localhost:8080/user/${this.username}/todos`);
    return this.http.post<Todos>(`http://localhost:8080/user/${this.username}/todos`, todo);
  }

  deleteTodo(id:number){
    console.log(`http://localhost:8080/user/${this.username}/todos/${id}`);
    return this.http.delete(`http://localhost:8080/user/${this.username}/todos/${id}`,
      {responseType: 'text'}
    )
  }

  updateTodo(id:number, todo:Todos){
    console.log(`http://localhost:8080/user/${this.username}/todos/${id}`, todo);
    return this.http.put<Todos>(`http://localhost:8080/user/${this.username}/todos/${id}`, todo);
  }

  getTodoById(id:number){
    console.log("this.http.get<Todos>(`http://localhost:8080/user/${this.username}/todos/${id}`)");
    return this.http.get<Todos>(`http://localhost:8080/user/${this.username}/todos/${id}`)
  }

}
