import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Member} from '../../model/member.model';
import {MemberService} from '../../service/member.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private memberService: MemberService
  ) { }
  isSubmitted = false
  isAccountSucceed = false
  isAccountFailed = false
  accountFeedback = ""

  isPaymentSucceed = false
  isPaymentFailed = false
  paymentFeedback = ""

  member: Member | null = null
  payedMember: Member | null = null
  paymentForm = this.formBuilder.group({
    nid: [null, [Validators.required, Validators.min(10000), Validators.max(9999999999)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  })

  ngOnInit(): void {
  }
  onSubmit(value: any){
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
               this.isAccountFailed = true
               this.isAccountSucceed = false
               this.accountFeedback = "No account found!"
               this.showSnackBar(this.accountFeedback, "Close")

             } else if(this.member != null && this.member.password != value.password){
               // password mismatched
               this.isAccountFailed = true
               this.isAccountSucceed = false
               this.accountFeedback = "Wrong Password!"
               this.showSnackBar(this.accountFeedback, "Close")

             } else if(this.member != null && this.member.password == value.password && this.member.fine == 0){
               // no due
               this.isAccountFailed = false
               this.isAccountSucceed = true
               this.accountFeedback = "No Due!"
               this.showSnackBar(this.accountFeedback, "Done")

               // @ts-ignore
             } else if(this.member != null && this.member.password == value.password && this.member.fine > 0){
               // have fine
               this.isAccountFailed = false
               this.isAccountSucceed = true
               this.accountFeedback = "Account Due!"
               this.showSnackBar(this.accountFeedback, "Done")

             }
           },
           (error) => {
             this.isAccountFailed = true
             this.isAccountSucceed = false
             this.accountFeedback = "Server Error!"
             this.showSnackBar(this.accountFeedback, "Close")
           }
         )
    }catch(e){
      this.isAccountFailed = true
      this.isAccountSucceed = false
      this.accountFeedback = "Error occurred!"
      this.showSnackBar(this.accountFeedback, "Close")
    }
    this.paymentForm.reset()
  }
  refreshPage(): void{
    window.location.reload()
  }
  showSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 5000})
  }
  payNow(member: Member): void{
    try{
      member.fine = 0
      this
        .memberService
        .updateMemberByObj(member)
        .subscribe(
          (response) => {
            if(response == null){
              // error
              this.isAccountSucceed = false
              this.isAccountFailed = false
              this.accountFeedback = ""

              this.isPaymentSucceed = false
              this.isPaymentFailed = true
              this.paymentFeedback = "Error occurred!"
              this.showSnackBar(this.paymentFeedback, "Close")
            } else if(response != null && response.fine != 0){
              // error
              this.isAccountSucceed = false
              this.isAccountFailed = false
              this.accountFeedback = ""

              this.isPaymentSucceed = false
              this.isPaymentFailed = true
              this.paymentFeedback = "Error occurred!"
              this.showSnackBar(this.paymentFeedback, "Close")

            } else if(response != null && response.fine == 0 && response.nid != member.nid){
              // error
              this.isAccountSucceed = false
              this.isAccountFailed = false
              this.accountFeedback = ""

              this.isPaymentSucceed = false
              this.isPaymentFailed = true
              this.paymentFeedback = "Error occurred!"
              this.showSnackBar(this.paymentFeedback, "Close")

            } else if(response != null && response.fine == 0 && response.nid == member.nid){
              // payed
              this.payedMember = response

              this.isAccountSucceed = false
              this.isAccountFailed = false
              this.accountFeedback = ""

              this.isPaymentSucceed = true
              this.isPaymentFailed = false
              this.paymentFeedback = "Payment Succeed!"
              this.showSnackBar(this.paymentFeedback, "Done")
            }
          },
          (error) => {
            // error
            this.isAccountSucceed = false
            this.isAccountFailed = false
            this.accountFeedback = ""

            this.isPaymentSucceed = false
            this.isPaymentFailed = true
            this.paymentFeedback = "Error occurred!"
            this.showSnackBar(this.paymentFeedback, "Close")
          }
        )
    }catch (e){
      // error
      this.isAccountSucceed = false
      this.isAccountFailed = false
      this.accountFeedback = ""

      this.isPaymentSucceed = false
      this.isPaymentFailed = true
      this.paymentFeedback = "Error occurred!"
      this.showSnackBar(this.paymentFeedback, "Close")
    }
  }

  // getters
  get nid(){
    return this.paymentForm.get('nid')
  }
  get password(){
    return this.paymentForm.get('password')
  }
}
