import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {AppRoutingModule, RoutingComponent} from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    declarations: [
        RoutingComponent,
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule
    ]
})
export class ComponentModule { }
