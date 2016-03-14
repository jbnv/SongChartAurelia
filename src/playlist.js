import {Data} from './data';

export class Playlist extends Data {

  fetchRouteFn = (parameters) => 'playlist/'+parameters.slug;

  title = '(Playlist)';
  songs = [];

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.title = inbound.title;
    this.songs = inbound.songs;
  }

}
