import {Data} from './data';

export class Artists extends Data {
  fetchRoute = 'artists';
  heading = 'Artists';

  artists = [];

  massage = (inbound) => {
    this.artists = inbound;
  }
}
