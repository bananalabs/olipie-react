import { Video } from './model';
import { SET_VIDEOS } from './constants';

export interface Action { 
    type: string;
    videos: Video[];
}
          
export function videosReducer(state: Video[], action: Action): Video[] {
    switch (action.type) {
        case SET_VIDEOS:
            return action.videos as Video[];
        default:
            return state;
    }
}

export default videosReducer;
