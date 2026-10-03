import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Todos } from '../../list-todos/list-todos';

@Injectable({
  providedIn: 'root',
})

export class TodosList{
  username:string = sessionStorage.getItem("authenticateUser")!;
  todoList = signal<Todos[]>([]);
  constructor(private http: HttpClient){}

  

  // loadTodos(){
  //   this.http.get<Todos[]>(`http://localhost:8080/user/${this.username}/todos`).subscribe(
  //       {
  //         next : (res) =>{
  //           this.todoList.set(res.map(todo => ({
  //             ...todo, targetDate: new Date(todo.targetDate)
  //           })))
  //         }
  //       }
  //     )
  // }

  // updatedTodoList(updatedTodo: Todos){
  //   this.todoList.update(list => list.map(t => t.id == updatedTodo.id ? updatedTodo: t))
  // }

  getTodosList(){
    console.log(`http://localhost:8080/user/${this.username}/todos`);
    
    return this.http.get<Todos[]>(`http://localhost:8080/user/${this.username}/todos`)
    
    // return this.http.get<Todos[]>("http://localhost:8080/user/manishBittu54/todos");

  }
}
