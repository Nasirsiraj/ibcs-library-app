import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {AppRoutingModule, RoutingComponent} from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckAccountComponent } from './check-account/check-account.component';


@NgModule({
    declarations: [
        RoutingComponent,
        FooterComponent,
        CheckAccountComponent,
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
