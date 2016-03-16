import {Data} from './data';

export class Sources extends Data {
  fetchRoute = 'sources';
  title = 'Sources';

  sources = [];

  massage = (inbound) => {
    this.sources = inbound;
  }
}
