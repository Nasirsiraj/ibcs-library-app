import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/book.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private apiUrl = environment.apiUrl

  // get book by id
  getBookById(id: number): Observable<Book | null>{
    return this.httpClient.get<Book | null>(`${this.apiUrl}/book/${id}`)
  }
  // post one book
  postOneBook(book: Book): Observable<Book | null>{
    return this.httpClient.post<Book | null>(`${this.apiUrl}/book`, book)
  }
}
