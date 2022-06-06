import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionTypes {
  initialState = '[global] initialState',
  ApiError = '[global] ApiError',
  putUserCredit = '[global] putUserCredit',
  getUsers = '[global] getUsers',
  putCapitalBaseBank = '[global] putCapitalBaseBank',
  addUsers = '[global] addUsers',
  modalAddUser = '[global] modalAddUser',
  message = '[global]  message',
  data = '[global]  data',
  userActual = '[global]  userActual',
  currencyBorrowed = '[global]  currencyBorrowed',
  dataPayment = '[global] dataPayment',
  typeModal = '[global] typeModal',


}


export class ApiError implements Action {
  readonly type = ActionTypes.ApiError;
  constructor(public payload: { error: HttpErrorResponse }) { }
}


export class getUsers implements Action {
  readonly type = ActionTypes.getUsers;
}

export class putUserCredit implements Action {
  readonly type = ActionTypes.putUserCredit;
  constructor(public payload: { collectionName: string, id: string, user: object }) { }
}

export class putCapitalBaseBank implements Action {
  readonly type = ActionTypes.putCapitalBaseBank;
  constructor(public payload: { money: number }) { }
}

export class initialState implements Action {
  readonly type = ActionTypes.initialState;
}

export class addUsers implements Action {
  readonly type = ActionTypes.addUsers;
  constructor(public payload: { collectionName: string, user: object }) { }
}

export class modalAddUser implements Action {
  readonly type = ActionTypes.modalAddUser;
  constructor(public payload: { user: object }) { }
}

export class message implements Action {
  readonly type = ActionTypes.message;
  constructor(public payload: { message: string }) { }
}

export class data implements Action {
  readonly type = ActionTypes.data;
  constructor(public payload: { data: object }) { }
}

export class dataPayment implements Action {
  readonly type = ActionTypes.dataPayment;
  constructor(public payload: { data: object }) { }
}

export class userActual implements Action {
  readonly type = ActionTypes.userActual;
  constructor(public payload: { user: object }) { }
}

export class currencyBorrowed implements Action {
  readonly type = ActionTypes.currencyBorrowed;
  constructor(public payload: { money: object }) { }
}

export class typeModal implements Action {
  readonly type = ActionTypes.typeModal;
  constructor(public payload: { modal: string }) { }
}



export type actions =
  ApiError
  | putCapitalBaseBank
  | initialState
  | addUsers
  | modalAddUser
  | message
  | getUsers
  | data
  | dataPayment
  | userActual
  | putUserCredit
  | currencyBorrowed
  | typeModal

