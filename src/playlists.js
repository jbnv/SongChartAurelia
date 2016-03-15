import {Data} from './data';

export class Playlists extends Data {
  fetchRoute = 'playlists';
  heading = 'Playlists';

  playlists = {};

  keys() {
    return Object.keys(this.playlists);
  }

  massage = (inbound) => {
    this.playlists = inbound;
  }
}