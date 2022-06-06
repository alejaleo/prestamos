import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { putCapitalBaseBank, putUserCredit, initialState, getUsers } from './config/global.action';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private store: Store<any>,
    private observer: BreakpointObserver
  ) { }

  capitalBank$: Observable<any> = this.store.select(state => state.capitalBank);
  capitalBank: any;

  currencyBorrowed$: Observable<any> = this.store.select(state => state.currencyBorrowed);
  currencyBorrowed: any;

  ngAfterViewInit() {
    //inicializa el estado de redux
    this.store.dispatch(new initialState());
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  ngOnInit() {
    //despacha la llamada a la bd de usuarios
    this.store.dispatch(new getUsers());
    this.capitalBank$.subscribe((capital) => {
      if (capital !=0) {
        // se formatea a moneda
        this.capitalBank = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
        }).format(capital);
      }
      else{
        this.capitalBank=0;
      }
    })
    this.currencyBorrowed$.subscribe((capitalB) => {
      if (capitalB!=0) {
        // se formatea a moneda
        this.currencyBorrowed =new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
        }).format(capitalB);
      }else{
        this.currencyBorrowed=0;
      }
    })

  }
}
