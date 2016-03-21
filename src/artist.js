import {Data} from './data';

export class Artist extends Data {

  fetchRouteFn = (parameters) => 'artist/'+parameters.slug;

  title = '(Artist)';
  complete = false;
  type = "";
  genres = [];
  birth = "";
  death = "";
  origin = "";
  songs = [];

  massage = (inbound) => {
    this.title = inbound.title;
    this.complete = inbound.complete;
    this.type = inbound.type;
    this.genres = inbound.genres || [];
    this.birth = inbound.birth;
    this.death = inbound.death;
    this.origin = inbound.origin;
    this.songs = inbound.songs || [];
  }

}
