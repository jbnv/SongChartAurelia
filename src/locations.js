import {Data} from './data';

export class Locations extends Data {
  fetchRoute = 'locations';
  title = 'Locations';

  locations = {};

  keys() {
    return Object.keys(this.locations);
  }

  massage = (inbound) => {
    this.locations = inbound;
  }
}
