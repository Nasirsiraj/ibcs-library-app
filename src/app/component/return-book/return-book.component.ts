import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MemberService} from '../../service/member.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookService} from '../../service/book.service';
import {Member} from '../../model/member.model';
import {Book} from '../../model/book.model';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
    private bookService: BookService
  ) { }

  isSubmitted = false
  isAccountSucceed = false
  isAccountFailed = false
  accountFeedbackMessage = ""

  isReturnBookSucceed = false
  isReturnBookFailed = false
  returnBookFeedbackMessage = ""

  member: Member | null = null
  book: Book | null = null
  returnBookForm = this.formBuilder.group({
    nid: [null, [Validators.required, Validators.min(10000), Validators.max(9999999999)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  })

  ngOnInit(): void {
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
              this.isAccountFailed = true
              this.isAccountSucceed = false
              this.accountFeedbackMessage = "Member not found!"
              this.showSnackBar(this.accountFeedbackMessage, "Close")

            } else if(this.member != null && this.member.password != value.password){
              this.isAccountFailed = true
              this.isAccountSucceed = false
              this.accountFeedbackMessage = "Wrong Password!"
              this.showSnackBar(this.accountFeedbackMessage, "Close")

            } else if(this.member != null && this.member.password == value.password && (this.member.book == '' || this.member.book == null)){
              this.isAccountFailed = false
              this.isAccountSucceed = true
              this.accountFeedbackMessage = "No book found!"
              this.showSnackBar(this.accountFeedbackMessage, "Done")

            } else if(this.member != null && this.member.password == value.password && (this.member.book != '' || this.member.book != null)){
              // need to return book
              console.log(this.member)
              this.isAccountFailed = false
              this.isAccountSucceed = true
              this.accountFeedbackMessage = "Book found!"
              this.showSnackBar(this.accountFeedbackMessage, "Done")
            }
          },
          (error) => {
            this.isAccountFailed = true
            this.isAccountSucceed = false
            this.accountFeedbackMessage = "Server Error!"
            this.showSnackBar(this.accountFeedbackMessage, "Close")
          }
        )
    }catch (e){
      this.isAccountFailed = true
      this.isAccountSucceed = false
      this.accountFeedbackMessage = "Error occurred!"
      this.showSnackBar(this.accountFeedbackMessage, "Close")
    }
    this.returnBookForm.reset()
  }
  returnBook(member: Member): void{
    if(member != null){
      try {
        // @ts-ignore
        this.member.book = null
        this
          .memberService
          .updateMemberByObj(member)
          .subscribe(
            (response) => {
              if(response == null){
                this.isReturnBookSucceed = false
                this.isReturnBookFailed = true
                this.returnBookFeedbackMessage = "Error occurred, return failed!"
                this.showSnackBar(this.returnBookFeedbackMessage, 'Close')

              }else if(response.book != null){
                this.isReturnBookSucceed = false
                this.isReturnBookFailed = true
                this.returnBookFeedbackMessage = "Error occurred, return failed!"
                this.showSnackBar(this.returnBookFeedbackMessage, 'Close')

              }else if(response.book == null){
                this.isReturnBookSucceed = true
                this.isReturnBookFailed = false
                this.returnBookFeedbackMessage = "Book returned successfully!"
                this.showSnackBar(this.returnBookFeedbackMessage, 'Done')
              }
            },
            (error) => {
              this.isReturnBookSucceed = false
              this.isReturnBookFailed = true
              this.returnBookFeedbackMessage = "Server Error, return failed!"
              this.showSnackBar(this.returnBookFeedbackMessage, 'Close')
            }
          )
      }catch (e) {
        this.isReturnBookSucceed = false
        this.isReturnBookFailed = true
        this.returnBookFeedbackMessage = "Error occurred, return failed!"
        this.showSnackBar(this.returnBookFeedbackMessage, 'Close')
      }
    }
  }
  refreshPage(): void{
    window.location.reload()
  }
  showSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 5000})
  }

  // getters
  get nid(){
    return this.returnBookForm.get('nid')
  }
  get password(){
    return this.returnBookForm.get('password')
  }
}
