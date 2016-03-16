import {Data} from './data';

export class Genres extends Data {
  fetchRoute = 'genres';
  title = 'Genres';

  genres = {};

  keys() {
    return Object.keys(this.genres);
  }

  massage = (inbound) => {
    this.genres = inbound;
  }
}
