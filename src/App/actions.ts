import { SET_MODE, SET_ACCOUNT, SET_USER, Mode } from './constants';
import { User } from '../User/model';

/**
 * Set account id of logged in user
 * @return {object}    An action object with a type of SET_ACCOUNT
 */
export function setAccount(accountId: string): {type: string, accountId: string} {
    return {
      type: SET_ACCOUNT,
      accountId
    };
}

/*
 * Set App Mode
 *
 * @return {object}    An action object with a type of SET_MODE
 */
export function setMode(mode: Mode): {type: string, mode: Mode} {
    return {
      type: SET_MODE,
      mode
    };
}

/*
 * Set current user
 *
 * @return {object}    An action object with a type of SET_USER
 */
export function setUser(user: User): {type: string, user: User} {
  return {
    type: SET_USER,
    user
  };
}
  