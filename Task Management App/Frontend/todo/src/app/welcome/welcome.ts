import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Footer } from '../footer/footer';
import { WelcomeData } from '../service/data/welcome-data';

export class HelloWorldBean{
  constructor(public message:string){

  }
}

@Component({
  selector: 'app-welcome',
  imports: [RouterModule, Menu, Footer],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
  standalone:true
})
export class Welcome implements OnInit{

  name : string = ''
  message: string =''
  constructor(private route: ActivatedRoute, private service:WelcomeData){
   
    
  }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    
       console.log(this.route.snapshot.params['name']);
       this.name = this.route.snapshot.params['name'];
  }

  getMessage(){
    console.log("Your customized message");
    // console.log(this.service.executeHelloWorldBeanService());
     this.service.executeHelloWorldBeanService().subscribe({
      next: (response) => {
        console.log(response)
        console.log(response.message);
        this.message = response.message;
        
      },
      error: (err) => {console.log("Error Occured ",err)
                        console.log("err.error--",err.error);
                        console.log("err.error.message---",err.error.message);
                      this.message = err.error.message
                        
      }
      
     }
      
     );
  }
}
