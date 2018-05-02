import { GET_VIDEOS } from './constants';

/**
 * Search videos using given keywords
 *
 * @return {object}    An action object with a type of SEARCH_VIDEOS
 */
export function getVideos(payload: {keywords: string, url?: string, history?: any}): 
          {type: string, payload: {keywords: string, url?: string, history?: any}} {
    return {
      type: GET_VIDEOS,
      payload
    };
}