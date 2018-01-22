import { 
    SET_VIDEOS,
    ADD_VIDEO_TO_HISTORY
} from './constants';
import { Video } from './model';
import { User } from '../User/model';
  
/**
 * Set videos for current page (either from search or user's viewing history)
 *
 * @return {object}    An action object with a type of SET_VIDEOS
 */
export function setVideos(videos: Video[]): {type: string, videos: Video[]} {
    return {
      type: SET_VIDEOS,
      videos
    };
}

/**
 * Add a video to user's viewing history
 *
 * @return {object}    An action object with a type of ADD_VIDEO_TO_HISTORY
 */
export function addVideoToHistory(user: User, video: Video):
                  {type: string, user: User, video: Video} {
    return {
      type: ADD_VIDEO_TO_HISTORY,
      user,
      video
    };
}