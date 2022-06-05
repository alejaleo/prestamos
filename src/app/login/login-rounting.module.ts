import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'loginPage', component: LoginPageComponent },
      { path: '**', redirectTo: 'loginPage' }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LoginRountingModule { }
