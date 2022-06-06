import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { addUsers, modalAddUser } from 'src/app/config/global.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.css']
})
export class ModalAddUserComponent implements OnInit {

  form: FormGroup ;
  formEdit: FormGroup;
  durationInSeconds = 3;

  message$: Observable<any> = this.store.select(state => state.message);
  message: any;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalAddUserComponent>,
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }



  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cc: ['', Validators.required],
    });


    this.message$.subscribe((message) => {
      if (message) {
        this.openSnackBar(message);
      }
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  closeModal() {
    this.dialogRef.close()
  }
//se despacha acion para crear usuario
  saveModal() {
    let dateCreate = new Date();
    let users = {
      name: this.form.value.name,
      email: this.form.value.email,
      cc: this.form.value.cc,
      dateCreate: dateCreate
    }
    if (this.form.valid) {
      this.dialogRef.close()
      this.store.dispatch(new addUsers({ collectionName: "Users", user: users }));
    }
  }
}
