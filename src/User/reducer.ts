import { User } from './model';
import { GET_USERS_SUCCESS, ADD_USER_SUCCESS } from './constants';

export interface Action { 
    type: string;
    users?: User[];
    user?: User;
}
          
export function userReducer(state: User[], action: Action): User[] {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return action.users as User[];
        case ADD_USER_SUCCESS:
            return [...state, action.user] as User[];
        default:
            return state;
    }
}

export default userReducer;
