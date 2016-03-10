import {Data} from './data';

export class Sources extends Data {
  fetchRoute = 'sources';
  heading = 'Sources';

  sources = [];

  massage = (inbound) => {
    this.sources = inbound;
    console.log("sources:massage",inbound);
  }
}
