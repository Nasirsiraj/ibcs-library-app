import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }
  paymentForm = this.formBuilder.group({
    nid: [null, [Validators.required, Validators.min(10000), Validators.max(9999999999)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  })

  ngOnInit(): void {
  }
  onSubmit(value: any){
    console.log(value)
  }

  // getters
  get nid(){
    return this.paymentForm.get('nid')
  }
  get password(){
    return this.paymentForm.get('password')
  }
}
