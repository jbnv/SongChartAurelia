import {Data} from './data';

export class Artists extends Data {
  fetchRoute = 'artists';
  heading = 'Artists';

  artists = {};

  keys() {
    return Object.keys(this.artists);
  }

  massage = (inbound) => {
    this.artists = inbound;
  }
}
