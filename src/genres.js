import {Data} from './data';

export class Genres extends Data {
  fetchRoute = 'genres';
  heading = 'Genres';
  genres = {};
  keys = [];

  massage(genres) {
    this.genres = genres;
    this.keys = Object.keys(genres);
  }
}
