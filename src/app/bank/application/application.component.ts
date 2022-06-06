import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { getUsers, userActual } from 'src/app/config/global.action';
import { ModalApplicationComponent } from '../modal-application/modal-application.component';

export interface columns {
  name: string;
  email: string;
  cc: number;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'cc', 'actions'];
  dataSource: columns[] = [];


  data$: Observable<any> = this.store.select(state => state.data);
  data: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.data$.subscribe((data) => {
      if (data) {
        console.log("data", data);
        this.dataSource = data;
        console.log("datasourse", this.dataSource);
      }
    })


  }
  openModal() {
    this.dialog.open(ModalAddUserComponent, { width: '30vw', height: '22rem' })
    console.log("entra")

  }

  openModalApply(row:any) {
    console.log("event",row)
    this.store.dispatch(new userActual(row));
    this.dialog.open(ModalApplicationComponent, { width: '30vw', height: '22rem' })
    console.log("entra")

  }

}
