import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CheckBookEntry} from "./user";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class BookModelService {
  public path: string = "https://localhost:7274/BookModel"

  constructor(private httpClient: HttpClient) {
  }
  GetBookById(id: number) {
    return this.httpClient.get("http://localhost:5208/BookModel" + "/" + id)

  }
  GetAllBooks(){

    return this.httpClient.get('http://localhost:5208/BookModel')
  }

  AddBook(book: any): any{
    const header = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.post('http://localhost:5208/BookModel', JSON.stringify(book), {headers: header})
  }

  editBook(book:any): any{
    const header = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.put('http://localhost:5208/BookModel' + "/" + book.BookId, JSON.stringify(book),{headers: header})

  }
  deleteBook(id:number):any{
    return this.httpClient.delete("http://localhost:5208/BookModel"+"/"+id)
  }

}


