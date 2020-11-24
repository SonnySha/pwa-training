import 'whatwg-fetch'

export const API_URL = 'https://content.guardianapis.com/search'
const API_KEY = 'test';

class Api {
  /**
   * Get the list of all articles
   */
  getAll() {
    return fetch(API_URL + '?api-key=' + API_KEY + '&show-fields=trailText,thumbnail')
      .then(response => response.json())
      .then(res => res.response && res.response.results)
  }
}

export default new Api();