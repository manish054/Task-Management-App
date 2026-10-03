import { Component, OnInit, signal } from '@angular/core';
import { ListTodos, Todos } from '../list-todos/list-todos';
import { Router } from '@angular/router';
import { TodoPost } from '../service/todo-post';
import { TodosList } from '../service/data/todos-list';
import { DatePipe } from '@angular/common';
import { ExportService } from '../service/export-service';

@Component({
  selector: 'app-todos-tracker',
  imports: [DatePipe],
  templateUrl: './todos-tracker.html',
  styleUrl: './todos-tracker.css',
  standalone:true
})
export class TodosTracker implements OnInit{
  todoList = signal<Todos[]>([]);
  username:string = '';
  constructor(private router:Router, private todosService: TodosList,
    private todoService:TodoPost, private excelService:ExportService
  ){}

  ngOnInit(): void {
      this.getTrackerTodosList()
  }
  getTrackerTodosList() {
    this.todosService.getTodosList().subscribe({
      next: (res) => {
        console.log("res---", res);
        this.todoList.set(res.filter(e => e.movedToTracker == true).sort((res1, res2) =>
          new Date(res1.targetDate).getTime() - new Date(res2.targetDate).getTime()));
        console.log("todoList--", this.todoList());
      },
      error: (err) => {
        console.log("err--", err);
      }

    })
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

  moveToTodos(id:number){
    this.todoService.getTodoById(id).subscribe({
      next: (res) => {
        const updatedTodo = new Todos(res.id, res.description, true, res.targetDate, false);
        console.log("this.todo***", updatedTodo);
        this.todoList.update(list => list.filter(td => td.id != id))
        this.todoService.updateTodo(id, updatedTodo).subscribe();
        console.log(this.todoList());
      }
    });
  }

  export(){
    console.log("export to excel--");
    this.username = sessionStorage.getItem("authenticateUser")!
    this.excelService.exportToExcel(this.username).subscribe((data:Blob) =>{
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history_todos.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    }
    )
  }
}
