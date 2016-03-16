import {Data} from './data';

export class Artists extends Data {
  fetchRoute = 'artists';
  title = 'Artists';

  artists = [];

  massage = (inbound) => {
    this.artists = inbound;
  }
}
