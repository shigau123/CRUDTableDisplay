import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private apicall: HttpClient) { }
  val: any
  ngOnInit(): void {
    this.apicall.get('http://localhost:3000/signup').subscribe((x) => {
      this.val = x
    })
  }
  myform = new FormGroup({
    ename: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.required, Validators.minLength(8),]),
  })
  get ename() {
    return this.myform.get('ename')
  }
  get password() {
    return this.myform.get('password')
  }
  Signin() {
    const user = this.val.find((x: any) => {
      return x.email === this.ename?.value && x.pass === this.password?.value
    })
    if (user) { 
      alert('login sucessfull!!')
      this.router.navigate(['addemployee'])
    }else if (this.ename?.value||this.password?.value||this.ename?.value && this.password?.value){
      alert('Credintials are Not Valid!!')
      // this.router.navigate(['registeration'])
    }
     else {
      alert('Register to login!!')
      this.router.navigate(['registeration'])
    }
  }
  onRegisterClick(){
    this.router.navigate(['registeration'])
  }
}

