import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BookService} from '../../service/book.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Book} from '../../model/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) { }
  isSubmitted = false
  feedbackMessage = ''
  isSucceed = false
  isFailed = false

  book: Book | null = null
  addBookForm = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    writer: ['', [Validators.required]],
    page: [null, [Validators.required]]
  })
  ngOnInit(): void {
  }
  onSubmitted(value: Book): void{
    this.isSubmitted = true
    try{
      this
        .bookService
        .postOneBook(value)
        .subscribe(
          (response) => {
            this.book = response
            if(this.book == null){
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = 'Error occurred!'
              this.showSnackBar(this.feedbackMessage, 'Close')

            } else if(this.book != null){
              this.isSucceed = true
              this.isFailed = false
              this.feedbackMessage = 'Book Added!'
              this.showSnackBar(this.feedbackMessage, 'Done')

            }
          },
          (error) => {
            this.isSucceed = false
            this.isFailed = true
            this.feedbackMessage = 'Server Error!'
            this.showSnackBar(this.feedbackMessage, 'Close')
          }
        )
    }catch (e){
      this.isSucceed = false
      this.isFailed = true
      this.feedbackMessage = 'Error occurred!'
      this.showSnackBar(this.feedbackMessage, 'Close')
    }
    this.addBookForm.reset()
  }
  refreshPage(): void{
    window.location.reload()
  }
  showSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 5000})
  }
  // getters
  get id(){
    return this.addBookForm.get('id')
  }
  get name(){
    return this.addBookForm.get('name')
  }
  get subject(){
    return this.addBookForm.get('subject')
  }
  get writer(){
    return this.addBookForm.get('writer')
  }
  get page(){
    return this.addBookForm.get('page')
  }
}
