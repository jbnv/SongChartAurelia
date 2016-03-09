import {Data} from './data';

export class Locations extends Data {
  fetchRoute = 'locations';
  heading = 'Locations';

  locations = {};

  keys() {
    return Object.keys(this.locations);
  }

  massage = (inbound) => {
    this.locations = inbound;
  }
}
