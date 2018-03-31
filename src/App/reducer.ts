import { AppState } from './model';
import { SET_CURRENT_ACCOUNT, SET_CURRENT_USER, SHOW_SEARCH_BAR } from './constants';
import userReducer from '../User/reducer';
import settingsReducer from '../Settings/reducer';
import { videosReducer, relatedVideosReducer } from '../Videos/reducer';
import { User } from '../User/model';

export const initialState: AppState = {
    account: '',
    users: [],
    videos: [],
    relatedVideos: [],
    currentUser: null as User,
    showSearchBar: false,
    settings: { filter: '' }
};

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
        return action.payload.user ? {...action.payload.user} : null;
      default:
        return state;
    }
}

function searchBar(state: boolean, action: any): boolean {
    switch (action.type) {
      case SHOW_SEARCH_BAR:
        return action.payload.show;
      default:
        return state;
    }
}

export default function appReducer(state: AppState = initialState, action: any): AppState {
    const appState = {
        account: account(state.account, action),
        users: userReducer(state.users, action),
        videos: videosReducer(state.videos, action),
        relatedVideos: relatedVideosReducer(state.relatedVideos, action),
        currentUser: currentUser(state.currentUser, action),
        showSearchBar: searchBar(state.showSearchBar, action),
        settings: settingsReducer(state.settings, action)
    };
    return appState;
}