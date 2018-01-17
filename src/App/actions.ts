import { SET_MODE, SET_ACCOUNT, Mode } from './constants';

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
  