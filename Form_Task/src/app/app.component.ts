import { Component, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Form_Task';

  data:any=[]
  // mainMaster  = [];
  storeArray(data = []){
    console.log(data);
    this.data=data;
    // this.mainMaster = data;
    console.log("MainMaster : **************************************"+data);
    
  }
  


  
}
