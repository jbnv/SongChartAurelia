import {Data} from './data';

export class Welcome extends Data {
  fetchRoute = 'summary';
  title = 'Summary';

  summary = {};

  massage = (inbound) => {
    this.summary = inbound;
  }
}
