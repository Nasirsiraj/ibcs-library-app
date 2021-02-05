import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ErrorPageComponent} from './component/error-page/error-page.component';
import {CreateAccountComponent} from './component/create-account/create-account.component';
import {ContactComponent} from './component/contact/contact.component';
import {HelpComponent} from './component/help/help.component';
import {ShareComponent} from './component/share/share.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'create-account', pathMatch: 'full'},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'help', component: HelpComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'share', component: ShareComponent},
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
  ShareComponent
];
