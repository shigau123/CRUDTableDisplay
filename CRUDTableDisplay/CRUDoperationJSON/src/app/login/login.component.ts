import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private routing:Router) { }

  ngOnInit(): void {
  }
   
  
    myform=new FormGroup({
    ename:new FormControl("",[Validators.email,Validators.required]),
    password:new FormControl("",[Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.required,Validators.minLength(8),]),
   })
   get ename(){
    return this.myform.get('ename')
  }
  get password(){
    return this.myform.get('password')
  }
  onNewUserClick(){
    this.routing.navigate(['registeration'])
  }

   Signin()
   {
    console.log(this.myform.value);
    
      
   }
  

}

