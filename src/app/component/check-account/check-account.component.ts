import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-check-account',
  templateUrl: './check-account.component.html',
  styleUrls: ['./check-account.component.scss']
})
export class CheckAccountComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }
  checkAccountForm = this.formBuilder.group({
    nid: [null, [Validators.required]],
    password: [null, [Validators.required]]
  })

  ngOnInit(): void {
  }
  onSubmit(value: any): void{
    console.log(value)
  }

  // getters
  get nid(){
    return this.checkAccountForm.get('nid')
  }
  get password(){
    return this.checkAccountForm.get('password')
  }
}
