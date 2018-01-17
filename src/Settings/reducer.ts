import { Settings } from './model';
import { SET_FILTER_SUCCESS } from './constants';

export interface Action { 
    type: string;
    keywords: string;
}
          
export function settingsReducer(state: Settings, action: Action): Settings {
    switch (action.type) {
        case SET_FILTER_SUCCESS:
            return Object.assign({}, state, {filter: action.keywords});
        default:
            return state;
    }
}

export default settingsReducer;
