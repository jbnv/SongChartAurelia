import {Data} from './data';

export class Song extends Data {

  fetchRouteFn = (parameters) => 'song/'+parameters.slug;

  title = '(Song)';

  constructor(http) {
    super(http);

  }

  massage = (inbound) => {
    this.title = inbound.title;
  }

}
