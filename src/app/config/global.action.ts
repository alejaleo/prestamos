import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionTypes {
  initialState = '[global] initialState',
  ApiError = '[global] ApiError',
  setContador = '[global] setContador',
  putContador = '[global] putContador',
  getUsers = '[global] getUsers',
  putCapitalBaseBank = '[global] putCapitalBaseBank',
  addUsers = '[global] addUsers',
  modalAddUser = '[global] modalAddUser',
  message = '[global]  message',
  data = '[global]  data',
}


export class ApiError implements Action {
  readonly type = ActionTypes.ApiError;
  constructor(public payload: { error: HttpErrorResponse }) { }
}

export class setContador implements Action {
  readonly type = ActionTypes.setContador;
  constructor(public payload: { contador: number }) { }
}

export class getUsers implements Action {
  readonly type = ActionTypes.getUsers;
}

export class putContador implements Action {
  readonly type = ActionTypes.putContador;
  constructor(public payload: { num: number }) { }
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

export type actions =
  ApiError
  | setContador
  | putCapitalBaseBank
  | initialState
  | addUsers
  | modalAddUser
  | message
  | getUsers
  | data
