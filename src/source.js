import {Data} from './data';

export class Source extends Data {

  fetchRouteFn = (parameters) => 'source/'+parameters.slug;

  title = '(Source)';

  constructor(http) {
    super(http);

  }

  massage = (inbound) => {
    this.title = inbound.title;
  }

}
