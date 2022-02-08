import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../add-employee/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api:HttpClient) { }

getEmployee(){
  return this.api.get('http://localhost:3000/posts')
}

postEmployee(data:IEmployee){
  return this.api.post('http://localhost:3000/posts/',data)
}

putEmployee(id:number,data:IEmployee){
 return this.api.put('http://localhost:3000/posts/'+id,data)
}

deleteEmployee(id:number){
  return this.api.delete('http://localhost:3000/posts/'+id)
}

RegisterValSave(data:any){
return this.api.post('http://localhost:3000/signup',data)
}

}

