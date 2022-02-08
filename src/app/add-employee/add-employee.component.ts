import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IEmployee } from './employee';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  empObj!: IEmployee
  EditId!:number
  Updatebool:boolean=false
  Addbool:boolean=true
  employeeTable: any
  constructor(private fb: FormBuilder, private apicall: ApiService) { }
  ngOnInit(): void {
    this.getEmployeeValFromSer()
  }

  EmpForm = this.fb.group({
    fullname: [''],
    designation: [''],
    age: [''],
    salary: ['']
  })
  get fullname() {
    return this.EmpForm.get('fullname')
  }
  get designation() {
    return this.EmpForm.get('designation')
  }
  get age() {
    return this.EmpForm.get('age')
  }
  get salary() {
    return this.EmpForm.get('salary')
  }

  onsubmit() {
    this.empObj = {
      fullname: this.fullname?.value,
      designation: this.designation?.value,
      age: this.age?.value,
      salary: this.salary?.value
    }

    this.postEmployeeValtoServer(this.empObj)
    this.getEmployeeValFromSer()
    this.EmpForm.reset()
    const closeval=document.getElementById('closeButton')
    closeval?.click()   
  }

  getEmployeeValFromSer() {
    this.apicall.getEmployee().subscribe((x) => {
      this.employeeTable = x
    })
  }

  postEmployeeValtoServer(data: IEmployee) {
    this.apicall.postEmployee(data).subscribe((x) => {
      console.log('object has been posted ' + x);
      this.getEmployeeValFromSer()
    })
  }

  onEdit(empval: any) {
    this.Addbool=false
    this.Updatebool=true
    this.EditId=empval.id
    this.fullname?.patchValue(empval.fullname)
    this.designation?.patchValue(empval.designation)
    this.age?.patchValue(empval.age)
    this.salary?.patchValue(empval.salary)
  }
  
  onUpdate(){
    this.empObj = {
      fullname: this.fullname?.value,
      designation: this.designation?.value,
      age: this.age?.value,
      salary: this.salary?.value
    }
    this.apicall.putEmployee(this.EditId,this.empObj).subscribe((x)=>{
      console.log('data edited done '+x);
    })
    const closeval=document.getElementById('closeButton')
    closeval?.click()   
    this.EmpForm.reset()
    this.Updatebool=false
    this.Addbool=true
    this.getEmployeeValFromSer()
  }

  onDelete(id: number) {
    this.apicall.deleteEmployee(id).subscribe((x) => {
      console.log('value has been deleted ' + x);
      this.getEmployeeValFromSer()
    })
  }
}
