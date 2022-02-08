import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  flag: boolean = false
  flag2: boolean = true
  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(): void {
  }

  myform = new FormGroup({
    name: new FormControl("", [Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{6,}'), Validators.minLength(6), Validators.required]),
    username: new FormControl("", [Validators.pattern('(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'), Validators.minLength(6), Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    pass: new FormControl("", [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.required, Validators.minLength(8),]),
    cpass: new FormControl("", [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.required, Validators.minLength(10),]),
  })


  get name() {
    return this.myform.get('name')
  }
  get username() {
    return this.myform.get('username')
  }
  get email() {
    return this.myform.get('email')
  }

  get pass() {
    return this.myform.get('pass')
  }

  get cpass() {
    return this.myform.get('cpass')
  }
  passValidaton() {
    if (this.pass?.value === this.cpass?.value) {
      this.flag = false
      this.flag2 = false
    } else {
      this.flag = true
      this.flag2 = true
    }
  }
  login() {
    this.api.RegisterValSave(this.myform.value).subscribe((x) => {
      console.log('Registeration value added sucessfully' + x);
    })
    alert('registeraton sucessful')
    this.router.navigate(['login'])
  }
  onRegisterClick(){
    this.router.navigate(['login'])
  }
}
