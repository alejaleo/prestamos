import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application/application.component';
import { PaymentComponent } from './payment/payment.component';
import { BankRoutingModule } from './bank-routing.module';



@NgModule({
  declarations: [
    ApplicationComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule
  ]
})
export class BankModule { }
