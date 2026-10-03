import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Login } from './login/login';
import { Menu } from './menu/menu';
import { Footer } from './footer/footer';
// import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App {
  protected readonly title = signal('todo');
}
