import { SET_CURRENT_ACCOUNT,
         SET_CURRENT_USER,
         SHOW_SEARCH_BAR,
         SET_IS_SEARCHING
       } from './constants';
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

/*
 * Toggle search bar display
 *
 * @return {object}    An action object with a type of SHOW_SEARCH_BAR
 */
export function showSearchBar(payload: {show: boolean}): 
               {type: string, payload: {show: boolean}} {
  return {
    type: SHOW_SEARCH_BAR,
    payload
  };
}

/*
 * Toggle isSearching
 *
 * @return {object}    An action object with a type of SET_IS_SEARCHING
 */
export function setIsSearching(payload: {searching: boolean}): 
               {type: string, payload: {searching: boolean}} {
  return {
    type: SET_IS_SEARCHING,
    payload
  };
}
  