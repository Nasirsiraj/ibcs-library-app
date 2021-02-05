import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {AppRoutingModule, RoutingComponent} from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckAccountComponent } from './check-account/check-account.component';
import { BrowseBooksComponent } from './browse-books/browse-books.component';
import { BorrowBooksComponent } from './borrow-books/borrow-books.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
    declarations: [
        RoutingComponent,
        FooterComponent,
        CheckAccountComponent,
        BrowseBooksComponent,
        BorrowBooksComponent,
        ReturnBookComponent,
        PaymentComponent,
    ],
    exports: [
        FooterComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class ComponentModule { }
