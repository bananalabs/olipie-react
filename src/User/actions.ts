import { 
  GET_USERS,
  GET_USERS_SUCCESS,
  ADD_USER,
  UPDATE_USER,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS
} from './constants';
import { User } from './model';

/**
 * Get all users for given account
 *
 * @return {object}    An action object with a type of GET_USERS
 */
export function getUsers(payload: {accountId: string}): 
         {type: string, payload: {accountId: string}} {
    return {
      type: GET_USERS,
      payload
    };
}

/*
 * Process user fetch success 
 *
 * @return {object}    An action object with a type of GET_USERS_SUCCESS
 */
export function getUsersSuccess(payload: {users: User[]}):
                {type: string, payload: {users: User[]}} {
    return {
      type: GET_USERS_SUCCESS,
      payload
    };
}

/**
 * Add a user
 *
 * @return {object}    An action object with a type of ADD_USER
 */
export function addUser(payload: {accountId: string, user: User}):
        {type: string, payload: {accountId: string, user: User}} {
  return {
    type: ADD_USER,
    payload
  };
}

/**
 * Update a user
 *
 * @return {object}    An action object with a type of UPDATE_USER
 */
export function updateUser(payload: {user: User}):
        {type: string, payload: {user: User}} {
  return {
    type: UPDATE_USER,
    payload
  };
}

/*
* Process user add success 
*
* @return {object}    An action object with a type of ADD_USER_SUCCESS
*/
export function addUserSuccess(payload: {user: User}):
               {type: string, payload: {user: User}} {
  return {
    type: ADD_USER_SUCCESS,
    payload
  };
}

/*
* Process user add success 
*
* @return {object}    An action object with a type of UPDATE_USER_SUCCESS
*/
export function updateUserSuccess(payload: {user: User}):
                  {type: string, payload: {user: User}} {
  return {
    type: UPDATE_USER_SUCCESS,
    payload
  };
}