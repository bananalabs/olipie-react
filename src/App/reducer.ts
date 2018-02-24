import { AppState } from './model';
import { Mode, SET_MODE, SET_CURRENT_ACCOUNT, SET_CURRENT_USER } from './constants';
import userReducer from '../User/reducer';
import settingsReducer from '../Settings/reducer';
import videosReducer from '../Videos/reducer';
import { User } from '../User/model';

export const initialState: AppState = {
    mode: Mode.Default,
    account: '',
    users: [],
    videos: [],
    currentUser: null as User,
    settings: { filter: '' }
};

function mode(state: Mode, action: any): Mode {
    switch (action.type) {
      case SET_MODE:
        return action.payload.mode;
      default:
        return state;
    }
}

function account(state: string, action: any): string {
    switch (action.type) {
      case SET_CURRENT_ACCOUNT:
        return action.payload.accountId;
      default:
        return state;
    }
}

function currentUser(state: User, action: any): User {
    switch (action.type) {
      case SET_CURRENT_USER:
        return action.payload.user;
      default:
        return state;
    }
}

export default function appReducer(state: AppState = initialState, action: any): AppState {
    const appState = {
        mode: mode(state.mode, action),
        account: account(state.account, action),
        users: userReducer(state.users, action),
        videos: videosReducer(state.videos, action),
        currentUser: currentUser(state.currentUser, action),
        settings: settingsReducer(state.settings, action)
    };
    return appState;
}