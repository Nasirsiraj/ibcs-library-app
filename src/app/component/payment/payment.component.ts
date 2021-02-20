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
    nid: [null, [Validators.required]],
    password: [null, [Validators.required]]
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
