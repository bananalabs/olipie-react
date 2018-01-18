import { AppState } from './model';
import { Mode, SET_MODE, SET_ACCOUNT } from './constants';
import userReducer from '../User/reducer';
import settingsReducer from '../Settings/reducer';

const initialState: AppState = {
    mode: Mode.NewUser,
    account: '',
    users: [],
    settings: { filter: '' }
};

function mode(state: Mode, action: any): Mode {
    switch (action.type) {
      case SET_MODE:
        return action.mode;
      default:
        return state;
    }
}

function account(state: string, action: any): string {
    switch (action.type) {
      case SET_ACCOUNT:
        return action.accountId;
      default:
        return state;
    }
}

export default function appReducer(state: AppState = initialState, action: any): AppState {
    const appState = {
        mode: mode(state.mode, action),
        account: account(state.account, action),
        users: userReducer(state.users, action),
        settings: settingsReducer(state.settings, action)
    };
    return appState;
}