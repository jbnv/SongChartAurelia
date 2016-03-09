import {Data} from './data';

export class Artist extends Data {

  fetchRouteFn = (parameters) => 'artist/'+parameters.slug;

  title = '(Artist)';

  constructor(http) {
    super(http);

  }

  massage = (inbound) => {
    this.title = inbound.title;
  }

}
