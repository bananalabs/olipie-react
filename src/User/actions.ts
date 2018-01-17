import { 
  GET_USERS,
  GET_USERS_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS
} from './constants';
import { User } from './model';

/**
 * Get all users for given account
 *
 * @return {object}    An action object with a type of GET_USERS
 */
export function getUsers(accountId: string): {type: string, accountId: string} {
    return {
      type: GET_USERS,
      accountId
    };
}

/*
 * Process user fetch success 
 *
 * @return {object}    An action object with a type of GET_USERS_SUCCESS
 */
export function getUsersSuccess(users: User[]): {type: string, users: User[]} {
    return {
      type: GET_USERS_SUCCESS,
      users
    };
}

/**
 * Add a user
 *
 * @return {object}    An action object with a type of ADD_USER
 */
export function addUser(accountId: string, user: User):
        {type: string, accountId: string, user: User} {
  return {
    type: ADD_USER,
    accountId,
    user
  };
}

/*
* Process user add success 
*
* @return {object}    An action object with a type of ADD_USER_SUCCESS
*/
export function addUserSuccess(user: User): {type: string, user: User} {
  return {
    type: ADD_USER_SUCCESS,
    user
  };
}
  