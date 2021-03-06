import {Data} from './data';

export class Location extends Data {

  fetchRouteFn = (parameters) => 'location/'+parameters.slug;

  title = '(Location)';
  parents = [];
  children = [];
  artists = [];

  constructor(http) {
    super(http);

  }

  massage = (inbound) => {
    this.title = inbound.title;
    this.parents = inbound.parents;
    this.children = inbound.children;
    this.artists = inbound.artists;
  }

}
