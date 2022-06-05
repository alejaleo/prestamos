import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getContador, putCapitalBaseBank, putContador, setContador } from './config/global.action';
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
  ) {

  }

  state$: Observable<any> = this.store.select(state => state['contador']);
  stateSubcription: Subscription = new Subscription;
  state: any;




  ngAfterViewInit() {
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
    this.stateSubcription=this.state$.subscribe((contador) => {
      if(contador){
        this.state = contador.contador;
        console.log(this.state, "hola2");
      }

    })

  }





}
