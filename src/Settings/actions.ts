import { SET_FILTER, UPDATE_FILTER, SET_FILTER_SUCCESS } from './constants';

/**
 * Set filter keywords for search
 *
 * @return {object}    An action object with a type of SET_FILTER
 */
export function setFilter(accountId: string, keywords: string): 
           {type: string, accountId: string, keywords: string} {
    return {
      type: SET_FILTER,
      accountId,
      keywords
    };
}

/**
 * Update filter keywords for search
 *
 * @return {object}    An action object with a type of SET_FILTER
 */
export function updateFilter(accountId: string, keywords: string): 
           {type: string, accountId: string, keywords: string} {
    return {
      type: UPDATE_FILTER,
      accountId,
      keywords
    };
}

/**
 * Filter set succesful
 *
 * @return {object}    An action object with a type of SET_FILTER_SUCCESS
 */
export function setFilterSuccess(keywords: string): 
                  {type: string, keywords: string} {
    return {
      type: SET_FILTER_SUCCESS,
      keywords
    };
}