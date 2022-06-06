import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { ActionTypes, actions } from './global.action';
import { environment } from '../../environments/environment';



export interface State {
}

export const reducers: ActionReducerMap<State> = {
};

export interface GlobalState {
  capitalBank: number;
  modalAddUser: object;
  menssage: string;
  data: object;
  userActual: object;

}

export const inicialStateGlobal: GlobalState = {
  capitalBank: environment.capitalBase,
  modalAddUser: {},
  menssage: "",
  data: {},
  userActual: {}
};

export function globalReducer(state: GlobalState = inicialStateGlobal, action: actions): GlobalState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export function globalMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: State, action: any) {
    switch (action.type) {
      case ActionTypes.setContador:
        return {
          ...state,
          capitalBank: action.payload.contador
        };
      case ActionTypes.modalAddUser:
        return {
          ...state,
          modalAddUser: action.payload.user
        };
      case ActionTypes.message:
        return {
          ...state,
          message: action.payload.message
        };
      case ActionTypes.data:
        return {
          ...state,
          data: action.payload.data
        };
      case ActionTypes.data:
        return {
          ...state,
          UserActual: action.payload.user
        };
      case ActionTypes.initialState:
        return {
          ...inicialStateGlobal
        };

      default:
        return reducer(state, action);
    }

  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [globalMetaReducer] : [globalMetaReducer];

