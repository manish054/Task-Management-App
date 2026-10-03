import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Error } from './error/error';
import { Welcome } from './welcome/welcome';
import { ListTodos } from './list-todos/list-todos';
import { Logout } from './logout/logout';
import { RouteGuard } from './service/route-guard';
import { TodoForm } from './todo-form/todo-form';
import { TodoFormUpdate } from './todo-form-update/todo-form-update';
import { SignUp } from './sign-up/sign-up';
import { VerifyEmail } from './verify-email/verify-email';
import { TodosTracker } from './todos-tracker/todos-tracker';
export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'signup', component:SignUp},
    {path:'verify', component:VerifyEmail},
    {path:'login', component:Login},
    {path:'welcome/:name', component: Welcome, canActivate:[RouteGuard]},
    {path:'todos', component: ListTodos, canActivate:[RouteGuard]},
    {path:'tracker', component: TodosTracker},
    {path:'logout', component: Logout, canActivate:[RouteGuard]},
    {path:'add-todo', component: TodoForm, canActivate:[RouteGuard]},
    {path:'add-todo/:description/:date', component: ListTodos, canActivate:[RouteGuard]},
    {path:'edit-todo/:id', component: TodoFormUpdate, canActivate:[RouteGuard]},
    {path:'**', component: Error}
];
