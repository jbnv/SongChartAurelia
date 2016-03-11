import {Data} from './data';

export class Source extends Data {

  fetchRouteFn = (parameters) => 'source/'+parameters.slug;

  title = '(Source)';
  type = "movie";
  songs = [];

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.title = inbound.title;
    this.type = inbound.type;
    this.songs = inbound.songs;
  }

}
