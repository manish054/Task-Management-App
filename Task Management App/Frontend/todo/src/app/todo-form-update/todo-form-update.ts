import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoPost } from '../service/todo-post';
import { ActivatedRoute, Router } from '@angular/router';
import { Todos } from '../list-todos/list-todos';
import { TodosList } from '../service/data/todos-list';



@Component({
  selector: 'app-todo-form-update',
  imports: [FormsModule],
  templateUrl: './todo-form-update.html',
  styleUrl: './todo-form-update.css',
  standalone:true
})

export class TodoFormUpdate implements OnInit{
  description = signal('');
  date = signal('');
  id:number = 0;
  todo!: Todos;
  pastDate: boolean = false;
  emptyDesc: boolean = false;
  constructor(private router:Router, private route:ActivatedRoute, 
    private todoService: TodoPost, private todosService:TodosList){
    
  }
  ngOnInit(): void {
    console.log("ngOnInit todo-form-update");
    
    this.id = this.route.snapshot.params['id'];
    this.todoService.getTodoById(this.id).subscribe({
      next: (res) => {
        console.log("TodoFormUpdate Response---", res);
        console.log(typeof(res.targetDate));
        this.description.set(res.description);
        console.log("this.description---", this.description());
        this.date.set(res.targetDate.toString());
        console.log("this.date ---", this.date());
      },
      error: (err) =>{ console.log("Error in OnInit", err);
      }
    })
  }

  save(){
    const today = new Date().setHours(0, 0, 0, 0);
    const enteredDate = new Date(this.date()).setHours(0, 0, 0, 0)
    if((today > enteredDate) || this.date() == ''){
      console.log("new Date().getDate()---",new Date());
      console.log("new Date(this.date).getDate()---",new Date(this.date()));
      this.pastDate = true;
      return
    }

    if(this.description().length <= 0){
      this.emptyDesc = true;
      return
    }
    console.log("save method--",this.route.snapshot);
    console.log("id---",this.id);
    console.log("this.description()---",this.description());
    console.log("this.date()---"+typeof(this.date()));
    const formattedDate = this.formatDate(new Date(this.date()))
    console.log("formattedDate---",formattedDate);
    console.log("formattedDate---",new Date(formattedDate));
    const updatedTodo: Todos = new Todos(this.id, this.description(), false, formattedDate, false);
    console.log("updatedTodo--", updatedTodo);
    
    this.todoService.updateTodo(this.id, updatedTodo).subscribe({
      next: (res) => {
        console.log("save() response---", res);
        this.router.navigate(['/todos']);
      },
      error: (err) =>{ console.log('Error in save()--', err);
      }
    })
  }

  formatDate(date: Date):string{
    console.log("formateDate---");
    console.log(date);
    const formatted = date.toISOString().split('T')[0];
    return formatted;
  }

  normalizeDate(date:Date): number{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  }
}
