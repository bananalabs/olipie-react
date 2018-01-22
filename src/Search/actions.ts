import { GET_VIDEOS } from './constants';

/**
 * Search videos using given keywords
 *
 * @return {object}    An action object with a type of SEARCH_VIDEOS
 */
export function getVideos(keywords: string): 
          {type: string, keywords: string} {
    return {
      type: GET_VIDEOS,
      keywords
    };
}