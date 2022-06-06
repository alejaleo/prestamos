import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { putCapitalBaseBank, putContador, setContador, initialState, getUsers } from './config/global.action';
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


  ngAfterViewInit() {
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
    this.store.dispatch(new getUsers());
    this.capitalBank$.subscribe((capital) => {
      if (capital) {
        this.capitalBank = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
        }).format(capital);


      }
    })


  }
}
