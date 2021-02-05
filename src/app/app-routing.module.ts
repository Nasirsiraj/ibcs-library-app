import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ErrorPageComponent} from './component/error-page/error-page.component';
import {CreateAccountComponent} from './component/create-account/create-account.component';
import {ContactComponent} from './component/contact/contact.component';
import {HelpComponent} from './component/help/help.component';
import {ShareComponent} from './component/share/share.component';
import {SettingsComponent} from './component/settings/settings.component';
import {CheckAccountComponent} from './component/check-account/check-account.component';
import {BrowseBooksComponent} from './component/browse-books/browse-books.component';
import {ReturnBookComponent} from './component/return-book/return-book.component';
import {PaymentComponent} from './component/payment/payment.component';
import {BorrowBooksComponent} from './component/borrow-books/borrow-books.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'create-account', pathMatch: 'full'},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'check-account', component: CheckAccountComponent},
      {path: 'browse-books', component: BrowseBooksComponent},
      {path: 'borrow-book', component: BorrowBooksComponent},
      {path: 'return-book', component: ReturnBookComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'help', component: HelpComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'share', component: ShareComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '**', redirectTo: 'create-account'}
    ]},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [
  DashboardComponent,
  ErrorPageComponent,
  CreateAccountComponent,
  ContactComponent,
  HelpComponent,
  ShareComponent,
  SettingsComponent,
  CheckAccountComponent,
  BrowseBooksComponent,
  BorrowBooksComponent,
  ReturnBookComponent,
  PaymentComponent
];
