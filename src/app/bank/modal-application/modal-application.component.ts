import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { addUsers, modalAddUser, putUserCredit } from 'src/app/config/global.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-application',
  templateUrl: './modal-application.component.html',
  styleUrls: ['./modal-application.component.css']
})
export class ModalApplicationComponent implements OnInit {

  form: FormGroup;
  formEdit: FormGroup;
  durationInSeconds = 3;
  aprovedCredit: number = 0;

  userActual$: Observable<any> = this.store.select(state => state.userActual);
  userActual: any;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalApplicationComponent>,
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {

    this.form = this.formBuilder.group({
      money: ['', Validators.required],
      date: ['', Validators],
    });

    this.userActual$.subscribe((userActual) => {
      console.log("mensaje", userActual);
      if (userActual) {
        this.userActual = userActual;
      }

    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }


  closeModal() {
    this.dialogRef.close()


  }

  saveModal() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.aprovedCredit = Math.random() * 1;
      if (this.aprovedCredit === 0) {
        this.openSnackBar("Su credito no fue Aprobado");
        this.dialogRef.close();
      } else {
        this.openSnackBar("Su credito fue Aprobado!!");
        this.dialogRef.close()
      }

      this.store.dispatch(new putUserCredit({collectionName: "Users", id: this.userActual.id,
        user: {
          name: this.userActual.name,
          email: this.userActual.email,
          cc: this.userActual.cc,
          application: true,
          amount: this.form.value.amount,
          date: this.form.value.date ? this.form.value.date : ""
        }
      }));
    }
  }
}
