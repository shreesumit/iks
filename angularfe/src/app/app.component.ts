import { Component } from '@angular/core';
import { UserdataService } from './services/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularfe';
  // users:any;
  // constructor(private userData: UserdataService){
  //    userData.users().subscribe((data)=> this.users = data)
  //    console.log(this.users)
  // }
}
