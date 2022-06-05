import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, EffectNotification, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, map, mergeMap, filter, exhaustMap, catchError, concatMap, switchMap, delay, take, takeUntil } from 'rxjs/operators';
import { FirebaseService } from '../services/firebaseService';
import { ActionTypes, getContador, putContador, setContador } from './global.action';
import { from } from 'rxjs';

@Injectable()

export class GeneralEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private store$: Store,
  ) { }

  getContador$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getContador),
      exhaustMap((action) => {
        return this.firebaseService.getFirebase("contador").pipe(
          map((response)=>{
            let listData:Array<any>=[];
            response.forEach((e:any)=>{
              let dataId=e.payload.doc.id;
              let data = e.payload.doc.data();
              listData.push({id:dataId,...data});
            })
            console.log(listData);
            return new setContador({ contador: 0})
          })
        )
      }),
      catchError((error:any)=>{
        console.log(error);
        return [];
      })
    ), { });
    putContador$ = createEffect(() =>
    this.actions$.pipe(
      ofType<putContador>(ActionTypes.putContador),
      exhaustMap((action) => {
        return from (this.firebaseService.addFirebase("contador",{num:action.payload.num})).pipe(
          map((response)=>{
            return new setContador({ contador: action.payload.num})
          })
        )
      }),
      catchError((error:any)=>{
        console.log(error);
        return [];
      })
    ), { });

// crear efecto delete

}

export const effects = [
  GeneralEffects,
];
