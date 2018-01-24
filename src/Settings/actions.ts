import { SET_FILTER, UPDATE_FILTER, SET_FILTER_SUCCESS } from './constants';

/**
 * Set filter keywords for search
 *
 * @return {object}    An action object with a type of SET_FILTER
 */
export function setFilter(payload: {accountId: string, keywords: string}): 
          {type: string, payload: {accountId: string, keywords: string}} {
    return {
      type: SET_FILTER,
      payload
    };
}

/**
 * Update filter keywords for search
 *
 * @return {object}    An action object with a type of SET_FILTER
 */
export function updateFilter(payload: {accountId: string, keywords: string}): 
             {type: string, payload: {accountId: string, keywords: string}} {
    return {
      type: UPDATE_FILTER,
      payload
    };
}

/**
 * Filter set succesful
 *
 * @return {object}    An action object with a type of SET_FILTER_SUCCESS
 */
export function setFilterSuccess(payload: {keywords: string}): 
                 {type: string, payload: {keywords: string}} {
    return {
      type: SET_FILTER_SUCCESS,
      payload
    };
}