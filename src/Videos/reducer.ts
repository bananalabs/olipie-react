import { Video } from './model';
import { SET_VIDEOS, UPDATE_VIDEO } from './constants';

export interface Action { 
    type: string;
    payload: {
        videos?: Video[];
        video?: Video;
    };
}
          
export function videosReducer(state: Video[], action: Action): Video[] {
    switch (action.type) {
        case SET_VIDEOS:
            return action.payload.videos as Video[];
        case UPDATE_VIDEO:
            let index = state.findIndex(
                (v: Video): boolean => v.id === action.payload.video.id);
            let videos: Video[] = [...state];
            videos[index] = {...action.payload.video};
            return videos;
        default:
            return state;
    }
}

export default videosReducer;
