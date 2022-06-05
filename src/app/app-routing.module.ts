import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'bank',
    loadChildren:() => import('./bank/bank.module').then(m =>m.BankModule)
  },
  {
    path:'**',
    redirectTo:'application'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
