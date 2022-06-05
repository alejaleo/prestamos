import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, EffectNotification, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, map, mergeMap, filter, exhaustMap, catchError, concatMap, switchMap, delay, take, takeUntil } from 'rxjs/operators';
//import { ApiService } from '../services/api.services';
import { ActionTypes, getContador, putContador, setContador } from './global.action';

@Injectable()

export class GeneralEffects {
  constructor(
    private actions$: Actions,
    //  private apiService: ApiService,
    //private router: Router,
    private store$: Store,
  ) { }

  getContador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getContador),
      map(() => {
        return new setContador({ contador: 5 })

      })
    ), {});
    putContador$ = createEffect(() =>
    this.actions$.pipe(
      ofType<putContador>(ActionTypes.putContador),
      map((action) => {
        return new setContador({ contador: action.payload.num})

      })
    ), { });

}

export const effects = [
  GeneralEffects,
];
