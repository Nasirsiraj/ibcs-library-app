import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MemberService} from '../../service/member.service';
import {Member} from '../../model/member.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private snackBar: MatSnackBar
  ) { }
  isSubmitted = false
  isSucceed = false
  isFailed = false
  feedbackMessage = ""

  member: Member | null = null
  randomstring = Math.random().toString(36).slice(-8)
  memberForm = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    nid: [null, [Validators.required, Validators.min(10000), Validators.max(9999999999)]],
    birthDate: ['', [Validators.required]],
    age: [null, [Validators.required, Validators.min(18), Validators.max(150)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    book: [''],
    issueDate: [''],
    fine: [0]
  })

  onSubmit(value: Member): void{
    this.isSubmitted = true
    try{
      this
        .memberService
        .postOneMember(value)
        .subscribe(
          (response) => {
            this.member = response
            console.log(response)
            if(this.member == null){
              // duplicate nid
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "Duplicate NID!"
              this.showSnackBar(this.feedbackMessage, "Close")

            } else if(this.member != null && this.member.nid != value.nid){
              // error occurred
              this.isSucceed = false
              this.isFailed = true
              this.feedbackMessage = "Error occurred!"
              this.showSnackBar(this.feedbackMessage, "Close")

            } else if(this.member != null && this.member.nid == value.nid){
              // succeed
              this.isSucceed = true
              this.isFailed = false
              this.feedbackMessage = "Member created successfully!"
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
      console.log(e.message)
      this.isSucceed = false
      this.isFailed = true
      this.feedbackMessage = "Error occurred!"
      this.showSnackBar(this.feedbackMessage, "Close")
    }

    this.memberForm.reset()
  }
  ngOnInit(): void {
  }
  showSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 5000})
  }
  refreshPage(): void{
    window.location.reload()
  }

  // getters
  get id(){
    return this.memberForm.get('id')
  }
  get name(){
    return this.memberForm.get('name')
  }
  get nid(){
    return this.memberForm.get('nid')
  }
  get birthDate(){
    return this.memberForm.get('birthDate')
  }
  get age(){
    return this.memberForm.get('age')
  }
  get email(){
    return this.memberForm.get('email')
  }
  get password(){
    return this.memberForm.get('password')
  }
  get address(){
    return this.memberForm.get('address')
  }
  get book(){
    return this.memberForm.get('book')
  }
  get issueDate(){
    return this.memberForm.get('issueDate')
  }
  get fine(){
    return this.memberForm.get('fine')
  }
}
