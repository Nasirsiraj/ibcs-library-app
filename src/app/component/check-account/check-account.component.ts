import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Member} from '../../model/member.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MemberService} from '../../service/member.service';

@Component({
  selector: 'app-check-account',
  templateUrl: './check-account.component.html',
  styleUrls: ['./check-account.component.scss']
})
export class CheckAccountComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private memberService: MemberService
  ) { }
  isSubmitted = false
  isSucceed = false
  isFailed = false
  feedbackMessage = ""

  member: Member | null = null
  checkAccountForm = this.formBuilder.group({
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
              // no account found
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "No Account found of this NID!"
              this.showSnackBar(this.feedbackMessage, "Close")

            } else if(this.member != null && this.member.password != value.password){
              // password mismatched
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "Wrong Password!"
              this.showSnackBar(this.feedbackMessage, "Close")

            } else if(this.member != null && this.member.password == value.password){
              // password matched
              this.isSucceed = true
              this.isFailed = false
              this.feedbackMessage = "Account Found!"
              this.showSnackBar(this.feedbackMessage, "Done")
            }
          },
          (error) => {
            this.isSucceed = false
            this.isFailed = true
            this.feedbackMessage = "Server Error!"
            this.showSnackBar(this.feedbackMessage, "Close")
          }
        )
    }catch (e){
      this.isSucceed = false
      this.isFailed = true
      this.feedbackMessage = "Error occurred!"
      this.showSnackBar(this.feedbackMessage, "Close")
    }

    this.checkAccountForm.reset()
  }
  refreshPage(): void{
    window.location.reload()
  }
  showSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 5000})
  }


  // getters
  get nid(){
    return this.checkAccountForm.get('nid')
  }
  get password(){
    return this.checkAccountForm.get('password')
  }
}
