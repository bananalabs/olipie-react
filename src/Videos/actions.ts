import {
    GET_VIDEOS,
    SET_VIDEOS,
    ADD_VIDEO_TO_HISTORY,
    FLAG_VIDEO,
    UPDATE_VIDEO
} from './constants';
import { Video } from './model';
import { User } from '../User/model';

/**
 * Get video's for specified user
 *
 * @return {object}    An action object with a type of GET_VIDEOS
 */
export function getVideos(payload: {user: User, flagged?: boolean}): 
          {type: string, payload: {user: User, flagged?: boolean}} {
    return {
      type: GET_VIDEOS,
      payload
    };
}
  
/**
 * Set videos for current page (either from search or user's viewing history)
 *
 * @return {object}    An action object with a type of SET_VIDEOS
 */
export function setVideos(payload: {videos: Video[]}): 
          {type: string, payload: {videos: Video[]}} {
    return {
      type: SET_VIDEOS,
      payload
    };
}

/**
 * Add a video to user's viewing history
 *
 * @return {object}    An action object with a type of ADD_VIDEO_TO_HISTORY
 */
export function addVideoToHistory(payload: {user: User, video: Video}):
                  {type: string, payload: {user: User, video: Video}} {
    return {
      type: ADD_VIDEO_TO_HISTORY,
      payload
    };
}

/**
 * Flag a video. Removes from user's history and future search results.
 *
 * @return {object}    An action object with a type of FLAG_VIDEO
 */
export function flagVideo(payload: {video: Video}):
          {type: string, payload: {video: Video}} {
    return {
      type: FLAG_VIDEO,
      payload
    };
}

/**
 * Update a video's attributes.
 *
 * @return {object}    An action object with a type of UPDATE_VIDEO
 */
export function updateVideo(payload: {video: Video}):
            {type: string, payload: {video: Video}} {
    return {
      type: UPDATE_VIDEO,
      payload
    };
}