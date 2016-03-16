import {Data} from './data';

export class Songs extends Data {
  fetchRoute = 'songs';
  title = 'Songs';

  songs = [];

  massage = (inbound) => {
    this.songs = inbound;
  }
}
