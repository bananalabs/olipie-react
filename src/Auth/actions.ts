import { ADD_ACCOUNT } from './constants';

/**
 * Create new/get existing account for signed in user
 * @return {object}    An action object with a type of ADD_ACCOUNT
 */
export function addAccount(payload: {name: string, email: string, history: any}):
           {type: string, payload: {name: string, email: string, history: any}} {
    return {
      type: ADD_ACCOUNT,
      payload
    };
}