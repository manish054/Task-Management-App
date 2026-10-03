
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Todos } from '../list-todos/list-todos';
import { TodoPost } from '../service/todo-post';

@Component({
  selector: 'app-todo-form',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css'
  
})
export class TodoForm {

  description: string = '';
  date: string = '';
  username: string = sessionStorage.getItem('authenticateUser')!;
  todo : Todos = new Todos(0, '', false, '', false);
  pastDate: boolean = false;
  emptyDesc: boolean = false;
  constructor(private router:Router, private todoPostService: TodoPost){
   
  }

  add(){
    if((new Date().getDate() > new Date(this.date).getDate()) || this.date == ''){
      console.log("new Date().getDate()---",new Date().getDate());
      console.log("new Date(this.date).getDate()---",new Date(this.date).getDate());
      this.pastDate = true;
      return
    }

    if(this.description.length <= 0){
      this.emptyDesc = true;
      return
    }
    console.log(this.router.url);
    console.log(this.description);
    console.log(this.date);
    console.log(this.username);
    this.todo.description = this.description;
    this.todo.targetDate = this.date;
    this.todo.done = false;
    console.log("this.todo.targetDate--",this.todo.targetDate);
    
    this.todoPostService.postTodo(this.todo).subscribe({
      next : (res) => {
        console.log(res);
        this.router.navigate(['/todos']);
      },
      error : (err) => console.log("Error while Adding--",err)

    })
    
  }
}
