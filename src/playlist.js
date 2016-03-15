import {Data} from './data';

export class Playlist extends Data {

  fetchRouteFn = (parameters) => 'playlist/'+parameters.slug;

  title = '(Playlist)';
  description = "";
  songs = [];

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.title = inbound.title;
    this.description = inbound.description;
    this.songs = inbound.songs;
  }

}
