import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {RoutingComponent} from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
   RoutingComponent,
   FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ComponentModule { }
