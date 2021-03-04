import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book.model';
import {BookService} from '../../service/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-browse-books',
  templateUrl: './browse-books.component.html',
  styleUrls: ['./browse-books.component.scss']
})
export class BrowseBooksComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }
  books: Book[] = []
  isLoading = true
  hasError = false
  isEmpty = false

  bookTableColumns = [
    'name',
    'subject',
    'writer',
    'page',
    'action'
  ]

  ngOnInit(): void {
    this.updateBooks()
  }
  updateBooks(): void{
    this
      .bookService
      .getAllBooks()
      .subscribe(
        (response) => {
          this.isLoading = false
          this.books = response
          if(this.books.length == 0){
            this.isEmpty = true
          }

        },
        (error) => {
          this.isLoading = false
          this.hasError = true
          this.isEmpty = true
        }
      )
  }
  borrowBooks(id: number): void{
    this.router.navigate(['/dashboard/borrow-book',id])
  }
}
