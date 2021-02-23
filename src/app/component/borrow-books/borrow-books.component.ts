import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../service/member.service';
import {BookService} from '../../service/book.service';
import {Book} from '../../model/book.model';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Member} from '../../model/member.model';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './borrow-books.component.html',
  styleUrls: ['./borrow-books.component.scss']
})
export class BorrowBooksComponent implements OnInit {

  constructor(
    private router: Router,
    private memberService: MemberService,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }
  bookId: number | null = null
  book: Book | null = null
  member: Member | null = null

  isLoading = true
  isBookFound = false
  isSubmitted = false
  isSucceed = false
  isFailed = false
  feedbackMessage = ""


  borrowBookForm = this.formBuilder.group({
    nid: [null, [Validators.required, Validators.min(10000), Validators.max(9999999999)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  })

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params.id
    if(this.bookId == null){
      this.isLoading = false
      this.isBookFound = false
      this.feedbackMessage = "Book ID not found!"
      this.showSnackBar(this.feedbackMessage, "Close")

    } else if(this.bookId != null){
      this.getBookById(this.bookId)
    }
  }
  getBookById(id: number):void {
    this
      .bookService
      .getBookById(id)
      .subscribe(
        (response) => {
          this.isLoading = false
          this.book = response
          if(this.book == null){
            this.isBookFound = false
            this.feedbackMessage = "Book not found!"
            this.showSnackBar(this.feedbackMessage, "Close")

          } else if(this.book != null){
            this.isLoading = false
            this.isBookFound = true
          }
        },
        (error) => {
          this.isLoading = false
          this.isBookFound = false
          this.feedbackMessage = "Server Error!"
          this.showSnackBar(this.feedbackMessage, "Close")
        }
      )
  }
  goToBrowseBooks(): void{
    this.router.navigate(['/dashboard/browse-books'])
  }
  onSubmit(value: any): void{
    this.isSubmitted = true
    try{
      this
        .memberService
        .getMemberByNid(value.nid)
        .subscribe(
          (response) => {
            this.member = response
            if(this.member == null){
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "Account not found!"
              this.showSnackBar(this.feedbackMessage, "Close")

            } else if(this.member != null && this.member.password != value.password){
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "Wrong Password!"
              this.showSnackBar(this.feedbackMessage, "Close")

            } else if(this.member != null && this.member.password == value.password && this.member.book != ''){
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "Please return your book first!"
              this.showSnackBar(this.feedbackMessage, "Close")
            } else if(this.member != null && this.member.password == value.password && this.member.book == ''){
              // @ts-ignore
              this.borrowUpdateMember(this.member, this.book.id)
            }
          },
          (error) => {}
        )
    }catch (e) {

    }
    this.borrowBookForm.reset()
  }

  borrowUpdateMember(member: Member, id?: number): void{
    // @ts-ignore
    member.book = id.toString()
    this.memberService
      .updateMemberByObj(member)
      .subscribe(
        (response) => {
          if(response == null){
            this.isSucceed = false
            this.isFailed = true
            this.feedbackMessage = "Internal server error!"
            this.showSnackBar(this.feedbackMessage, "Close")

          }else{
            this.isSucceed = true
            this.isFailed = false
            this.feedbackMessage = "Borrowing book confirmed!"
            this.showSnackBar(this.feedbackMessage, "Done")
          }
        },
        (error) => {
          this.isSucceed = false
          this.isFailed = true
          this.feedbackMessage = "Internal server error!"
          this.showSnackBar(this.feedbackMessage, "Close")
        }
      )
  }
  showSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 5000})
  }
  // getters
  get nid(){
    return this.borrowBookForm.get('nid')
  }
  get password(){
    return this.borrowBookForm.get('password')
  }
}
