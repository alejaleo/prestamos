import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, EffectNotification, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, map, mergeMap, filter, exhaustMap, catchError, concatMap, switchMap, delay, take, takeUntil } from 'rxjs/operators';
import { FirebaseService } from '../services/firebaseService';
import { ActionTypes, putUserCredit, addUsers, message, data, dataPayment } from './global.action';
import { from } from 'rxjs';

@Injectable()

export class GeneralEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private store$: Store,
  ) { }

  //efecto para traer los usuarios de firebase y guardarlos en el estado de redux
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getUsers),
      exhaustMap((action) => {
        return this.firebaseService.getFirebase("Users").pipe(
          exhaustMap((response) => {
            let listData: Array<any> = [];
            let listDataApplied: Array<any> = [];
            response.forEach((e: any) => {
              if (!e.payload.doc.data().application) {
                let dataId = e.payload.doc.id;
                let data = e.payload.doc.data();
                listData.push({ id: dataId, ...data });
              }
              else {
                let dataIdApplied = e.payload.doc.id;
                let dataApplied = e.payload.doc.data();
                listDataApplied.push({ id: dataIdApplied, ...dataApplied });
              }
            })
            return [
              new dataPayment({ data: listDataApplied }),
              new data({ data: listData })
            ]
          })
        )
      }),
      catchError((error: any) => {
        console.log(error);
        return [];
      })
    ), {});

//actualizar datos de los usuarios como el valor a pagar la fecha de acctualizacion etc
  putUserCredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType<putUserCredit>(ActionTypes.putUserCredit),
      exhaustMap((action) => {
        return from(this.firebaseService.putFirebase(action.payload.collectionName, action.payload.id, action.payload.user)).pipe(
          map((response) => {
            return new message({ message: "" })
          })
        )
      }),
      catchError((error: any) => {
        console.log(error);
        return [];
      })
    ), {});

//efecto para adicionar usuarios nuevos
  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType<addUsers>(ActionTypes.addUsers),
      exhaustMap((action) => {
        return from(this.firebaseService.addFirebase(action.payload.collectionName, action.payload.user)).pipe(
          map((response) => {
            return new message({ message: "Usuario creado satisfactoriamente!" })
          })
        )
      }),
      catchError((error: any) => {
        console.log(error);
        return [];
      })
    ), {});

}

export const effects = [
  GeneralEffects,
];
