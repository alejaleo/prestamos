import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { getUsers, userActual, typeModal } from 'src/app/config/global.action';
import { ModalApplicationComponent } from '../modal-application/modal-application.component';

export interface columns {
  name: string;
  amount: string;
  date: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'amount', 'date', 'actions'];
  dataSource: columns[] = [];

  dataPayment$: Observable<any> = this.store.select(state => state.dataPayment);
  dataPayment: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataPayment$.subscribe((data:any) => {
      if (data) {
        this.dataSource = data;
      }
    })
  }
  openModal() {
    this.dialog.open(ModalAddUserComponent, { width: '30vw', height: '22rem' })
  }
//envia el dato de cual modal debe abrirse
  openModalApply(row: any, event:any) {
    this.store.dispatch(new typeModal({modal:event}));
    this.store.dispatch(new userActual({ user: row }));
    this.dialog.open(ModalApplicationComponent, { width: '30vw', height: '18rem' })

  }

}
