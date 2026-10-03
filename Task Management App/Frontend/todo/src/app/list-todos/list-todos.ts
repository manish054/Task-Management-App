import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TodosList } from '../service/data/todos-list';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TodoPost } from '../service/todo-post';



export class Todos {
  constructor(public id: number,
    public description: string,
    public done: boolean,
    public targetDate: string,
    public movedToTracker:boolean
  ) {

  }
}
@Component({
  selector: 'app-list-todos',
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './list-todos.html',
  styleUrl: './list-todos.css',
  standalone: true
})

export class ListTodos implements OnInit {
  todoList = signal<Todos[]>([]);
  todo!: Todos;
  slNo: number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
    private todosService: TodosList, private todoService: TodoPost) {
  }


  //   todoList : Todos[] = [
  //     new Todos(1, 'Need to learn Angular', false, new Date()),
  //     new Todos(2, 'Need to learn Spring Boot', false, new Date()),
  //     new Todos(3, 'Need to learn Microservices', false, new Date())
  // ];

  ngOnInit(): void {
    console.log("on init called---");

    this.getTodosList()
  }

  getTodosList() {
    console.log("list-todos-snapshot--", this.route.snapshot);

    this.todosService.getTodosList().subscribe({
      next: (res) => {
        console.log("res---", res);
        this.todoList.set(res.sort((res1, res2) =>
          new Date(res1.targetDate).getTime() - new Date(res2.targetDate).getTime()));
        console.log("todoList--", this.todoList());
      },
      error: (err) => {
        console.log("err--", err);
      }

    })
  }

  // loadTodos():void{
  //   this.todosService.getTodosList().subscribe(
  //     (res) => this.todoList.set(res)
  //   )
  // }

  addTodo() {
    console.log("addTodo method");
    this.router.navigate(['/add-todo']);
  }

  edit(id: number) {
    console.log("Edit clicked");
    this.router.navigate(['/edit-todo', id])
  }

  delete(id: number) {
    console.log("delete clicked");
    console.log("id---", id);
    this.todoService.deleteTodo(id).subscribe({
      next: (res) => {
        this.todoList.update(list => list.filter(td => td.id != id))
        // this.todoList = this.todoList.filter(todo => todo.id != id)
        console.log("res***", res);
      },
      error: (err) => {
        console.log("error in delete--", err);

      }
    })
  }

  complete(id: number) {
    console.log("complete clicked--", id);
    this.todoService.getTodoById(id).subscribe({
      next: (res) => {
        const updatedTodo = new Todos(res.id, res.description, true, res.targetDate, res.movedToTracker);
        console.log("this.todo***", updatedTodo);
        this.todoList.update(list => list.map(td => td.id == id ? updatedTodo : td))
        this.todoService.updateTodo(id, updatedTodo).subscribe();
        console.log(this.todoList());
      }
    });
  }

  track(id: number) {
    console.log("id--", id);
    
    this.todoService.getTodoById(id).subscribe({
      next: (res) => {
        console.log("res**",res);
        
        const updatedTodo = new Todos(res.id, res.description, res.done, res.targetDate, true)
        this.todoList.update(list => list.filter(td => td.id != id ))
        this.todoService.updateTodo(id, updatedTodo).subscribe();
      }
    });
  }
}
