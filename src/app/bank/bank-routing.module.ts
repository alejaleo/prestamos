import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
{
  path:'',
  children:[
    {path:'application',component:ApplicationComponent},
    {path:'payment',component:PaymentComponent},
    {path:'**',redirectTo:'application'}
  ]
}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)



  ]
})
export class BankRoutingModule { }
