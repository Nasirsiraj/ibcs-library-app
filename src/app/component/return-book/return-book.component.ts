import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }
  returnBookForm = this.formBuilder.group({
    nid: [null, [Validators.required]],
    password: [null, [Validators.required]],
  })

  ngOnInit(): void {
  }
  onSubmit(value: any): void{
    console.log(value)
  }
  // getters
  get nid(){
    return this.returnBookForm.get('nid')
  }
  get password(){
    return this.returnBookForm.get('password')
  }
}
