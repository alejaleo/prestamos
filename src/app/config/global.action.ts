import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionTypes {
    ApiError = '[global] ApiError',
    setContador = '[global] setContador',
    putContador = '[global] putContador',
    getContador = '[global] getContador',
}


export class ApiError implements Action {
    readonly type = ActionTypes.ApiError;
    constructor(public payload: { error: HttpErrorResponse }) { }
}

export class setContador implements Action {
    readonly type = ActionTypes.setContador;
    constructor(public payload: { contador: number }) { }
}

export class getContador implements Action {
    readonly type = ActionTypes.getContador;
}

export class putContador implements Action {
    readonly type = ActionTypes.putContador;
    constructor(public payload: { num: number }) { }
}


export type actions =
    ApiError
    | setContador