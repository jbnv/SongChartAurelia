import {Data} from './data';

export class Genres extends Data {
  fetchRoute = 'genres';
  title = 'Genres';

  genres = {};
  content = function(value) {
    if (value) this.genres = value;
    return this.genres;
  }

  keys() {
    return Object.keys(this.genres);
  }

  massage = (inbound) => {
    this.genres = inbound;
  }

  sortColumn = "title";
  sortOrder = true; // true = normal; false = reverse;

  sortByTitle()       { this.sort("title"); }
  sortBySongCount()   { this.sort("songCount"); }
  sortByArtistCount() { this.sort("artistCount"); }
  sortByScore()       { this.sort("score"); }
}
