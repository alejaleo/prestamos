import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application/application.component';
import { PaymentComponent } from './payment/payment.component';
import { BankRoutingModule } from './bank-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModalApplicationComponent } from './modal-application/modal-application.component';



@NgModule({
  declarations: [
    ApplicationComponent,
    PaymentComponent,
    ModalAddUserComponent,
    ModalApplicationComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class BankModule { }
