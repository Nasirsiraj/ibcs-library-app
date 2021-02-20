import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book.model';

@Component({
  selector: 'app-browse-books',
  templateUrl: './browse-books.component.html',
  styleUrls: ['./browse-books.component.scss']
})
export class BrowseBooksComponent implements OnInit {

  constructor() { }
  books: Book[] = [
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
    {id: 101, name: 'ABC', subject: 'Math', writer: 'Nasir', page: 200 },
  ]
  bookTableColumns = [
    'name',
    'subject',
    'writer',
    'page',
    'action'
  ]

  ngOnInit(): void {
  }

}
