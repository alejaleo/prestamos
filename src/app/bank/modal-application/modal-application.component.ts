import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { addUsers, modalAddUser, putUserCredit, putCapitalBaseBank, currencyBorrowed, typeModal } from 'src/app/config/global.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-application',
  templateUrl: './modal-application.component.html',
  styleUrls: ['./modal-application.component.css']
})
export class ModalApplicationComponent implements OnInit {

  form: FormGroup;
  formTwo: FormGroup;
  durationInSeconds = 3;
  aprovedCredit: boolean = false;

  userActual$: Observable<any> = this.store.select(state => state.userActual);
  userActual: any;

  capitalBank$: Observable<any> = this.store.select(state => state.capitalBank);
  capitalBank: any;

  currencyBorrowed$: Observable<any> = this.store.select(state => state.currencyBorrowed);
  currencyBorrowed: any;

  typeModal$: Observable<any> = this.store.select(state => state.typeModal);
  typeModal: any;

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
      amount: ['', [Validators.required, Validators.min(10000), Validators.max(100000)]],
      date: [''],
    });


    this.userActual$.subscribe((userActual) => {
      if (userActual) {
        this.userActual = userActual;
      }
    })

    this.capitalBank$.subscribe((capital) => {
      this.capitalBank = capital;

    })

    this.currencyBorrowed$.subscribe((capital) => {
      this.currencyBorrowed = capital;
    })

    this.typeModal$.subscribe((modal) => {
      if (modal) {
        this.typeModal = modal;
      }
    })
    this.formTwo = this.formBuilder.group({
      amount: [{ value: this.userActual.amount, disabled: true }, Validators.required],
      pay: ['', Validators.required],
    });
  }
//envia un mensaje al usuario
  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

//cierra modal
  closeModal() {
    this.dialogRef.close()
    this.store.dispatch(new typeModal({ modal: "" }));


  }
//cambios en el capital base del banco el monto prestado, el estatus del usuario y la actualizacion de sus montos solicitados
  saveModalApplication(event: any) {
    //en caso de que se escoja solicitar prestamo
    if (event == 'apply') {
      if (this.form.valid) {
        this.aprovedCredit = Math.random() < 0.5;
        if (Number(this.capitalBank) < Number(this.form.value.amount)) {
          this.openSnackBar("Fondos Insuficientes!!");
          this.aprovedCredit = false;
          this.dialogRef.close();
        }
        else {
          if (this.aprovedCredit === false) {
            this.openSnackBar("Su credito no fue Aprobado");
            this.dialogRef.close();
          } else {
            this.openSnackBar("Su credito fue Aprobado!!");
            this.dialogRef.close();
            this.capitalBank = (Number(this.capitalBank) - Number(this.form.value.amount));
            this.store.dispatch(new putCapitalBaseBank({ money: this.capitalBank }));
            this.currencyBorrowed = (Number(this.currencyBorrowed) + Number(this.form.value.amount));
            this.store.dispatch(new currencyBorrowed({ money: this.currencyBorrowed }));
            let dateCreate = new Date();
            this.store.dispatch(new putUserCredit({
              collectionName: "Users", id: this.userActual.id,
              user: {
                name: this.userActual.name,
                email: this.userActual.email,
                cc: this.userActual.cc,
                application: true,
                amount: this.form.value.amount,
                date: this.form.value.date ? this.form.value.date : "",
                dateCreate: dateCreate
              }
            }));
          }
        }
      }
      //en caso de que se escoja pagar prestamo
    } else if (event == 'pay') {
      if (Number(this.userActual.amount) >= Number(this.formTwo.value.pay)) {
        if (Number(this.capitalBank === 0) || Number(this.capitalBank) < Number(this.formTwo.value.pay)) {
          this.capitalBank = this.capitalBank;
        } else {
          this.capitalBank = (Number(this.capitalBank) + Number(this.formTwo.value.pay));
          this.store.dispatch(new putCapitalBaseBank({ money: this.capitalBank }));
        }
        if (Number(this.currencyBorrowed === 0) || Number(this.currencyBorrowed) < Number(this.formTwo.value.pay)) {
          this.currencyBorrowed = this.currencyBorrowed;
        } else {
          this.currencyBorrowed = (Number(this.currencyBorrowed) - Number(this.formTwo.value.pay));
          this.store.dispatch(new currencyBorrowed({ money: this.currencyBorrowed }));
        }
        let decision = false;
        if (Number(this.formTwo.value.pay) === Number(this.userActual.amount)) {
          decision = false;
        } else {
          decision = true;
        }
        let currencyAmount = (Number(this.userActual.amount) - Number(this.formTwo.value.pay));
        this.dialogRef.close();
        this.openSnackBar("Se Pago Satisfactoriamente");
        let dateCreate = new Date();
        this.store.dispatch(new putUserCredit({
          collectionName: "Users", id: this.userActual.id,
          user: {
            name: this.userActual.name,
            email: this.userActual.email,
            cc: this.userActual.cc,
            application: decision,
            amount: currencyAmount,
            date: this.userActual.date,
            dateCreate: dateCreate
          }
        }));
      } else {
        this.openSnackBar("el monto es superior a su Deuda!!");
      }
    }
  }
}
