import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getContador, putContador, setContador } from './config/global.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<any>,
  ) { }

  state$: Observable<any> = this.store.select(state => state);
  state: any;

  ngOnInit() {
    console.log('hola')
    this.store.dispatch(new getContador())

    this.state$.subscribe((state) => {
      this.state = state.contador
    })
  }

  cambiar(num: number) {
    let number = this.state + num
    this.store.dispatch(new putContador({num: number}))
  }
}
