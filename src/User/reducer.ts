import { User } from './model';
import { GET_USERS_SUCCESS,
         ADD_USER_SUCCESS,
         UPDATE_USER_SUCCESS 
       } from './constants';

export interface Action { 
    type: string;
    payload: {
        users?: User[];
        user?: User;
    };
}
          
export function userReducer(state: User[], action: Action): User[] {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return action.payload.users as User[];
        case ADD_USER_SUCCESS:
            return [...state, action.payload.user] as User[];
        case UPDATE_USER_SUCCESS:
            let index = state.findIndex(
                (u: User): boolean => u.id === action.payload.user.id);
            let users: User[] = [...state];
            users[index] = {...action.payload.user};
            return users;
        default:
            return state;
    }
}

export default userReducer;
