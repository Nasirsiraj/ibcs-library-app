import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MemberService} from '../../service/member.service';
import {Member} from '../../model/member.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService
  ) { }
  memberForm = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    nid: [null, [Validators.required]],
    birthDate: ['', [Validators.required]],
    age: [null, [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    address: ['', [Validators.required]],
    book: [''],
    issueDate: [''],
    fine: [0]
  })

  onSubmit(member: Member): void{
    console.log(member)
    this.memberForm.reset()
  }
  ngOnInit(): void {
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
