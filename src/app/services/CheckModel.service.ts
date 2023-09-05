import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CheckEntry} from "./user";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CheckModelService {
  public path: "http://localhost:5208/CheckModel"

  constructor(private httpClient: HttpClient) {
  }

  getChecks(){
    return this.httpClient.get("http://localhost:5208/CheckModel")


  }

  addCheck(check: any): any {
    const header = new HttpHeaders().set('content-type', 'application/json')
    console.log(check)
    return this.httpClient.post("http://localhost:5208/CheckModel", JSON.stringify(check), {headers: header})
  }
  deleteCheck(id:number):any{
    return this.httpClient.delete("http://localhost:5208/CheckModel"+"/"+id)
  }
  updateCheck(check){
    const header = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.put("http://localhost:5208/CheckModel"+"/"+check.id,JSON.stringify(check),{headers:header})
  }

}
