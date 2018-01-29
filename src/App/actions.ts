import { SET_MODE, SET_CURRENT_ACCOUNT, SET_CURRENT_USER, Mode } from './constants';
import { User } from '../User/model';

/**
 * Set account id of logged in user
 * @return {object}    An action object with a type of SET_CURRENT_ACCOUNT
 */
export function setCurrentAccount(payload: {accountId: string}): 
                  {type: string, payload: {accountId: string}} {
    return {
      type: SET_CURRENT_ACCOUNT,
      payload
    };
}

/*
 * Set App Mode
 *
 * @return {object}    An action object with a type of SET_MODE
 */
export function setMode(payload: {mode: Mode}): 
                {type: string, payload: {mode: Mode}} {
    return {
      type: SET_MODE,
      payload
    };
}

/*
 * Set current user
 *
 * @return {object}    An action object with a type of SET_USER
 */
export function setCurrentUser(payload: {user: User}): 
               {type: string, payload: {user: User}} {
  return {
    type: SET_CURRENT_USER,
    payload
  };
}
  