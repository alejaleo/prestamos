import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, EffectNotification, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, map, mergeMap, filter, exhaustMap, catchError, concatMap, switchMap, delay, take, takeUntil } from 'rxjs/operators';
import { FirebaseService } from '../services/firebaseService';
import { ActionTypes, putUserCredit, setContador, addUsers, message, data } from './global.action';
import { from } from 'rxjs';

@Injectable()

export class GeneralEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private store$: Store,
  ) { }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getUsers),
      exhaustMap((action) => {
        return this.firebaseService.getFirebase("Users").pipe(
          map((response) => {
            let listData: Array<any> = [];
            response.forEach((e: any) => {
              let dataId = e.payload.doc.id;
              let data = e.payload.doc.data();
              listData.push({ id: dataId, ...data });
            })
            console.log(listData);
            return new data({ data: listData });
          })
        )
      }),
      catchError((error: any) => {
        console.log(error);
        return [];
      })
    ), {});
    putUserCredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType<putUserCredit>(ActionTypes.putUserCredit),
      exhaustMap((action) => {
        console.log("action de que le llega al put", action);
        return from(this.firebaseService.putFirebase(action.payload.collectionName,"hola",action.payload.user)).pipe(
          map((response) => {
            return new setContador({ contador: 0 })
          })
        )
      }),
      catchError((error: any) => {
        console.log(error);
        return [];
      })
    ), {});

  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType<addUsers>(ActionTypes.addUsers),
      exhaustMap((action) => {
        console.log("este es el action bd",action);
        return from(this.firebaseService.addFirebase(action.payload.collectionName, action.payload.user)).pipe(
          map((response) => {
            console.log(response)
            return new message({ message: "Usuario creado satisfactoriamente!" })
          })
        )
      }),
      catchError((error: any) => {
        console.log(error);
        return [];
      })
    ), {});

  // crear efecto delete

}

export const effects = [
  GeneralEffects,
];
