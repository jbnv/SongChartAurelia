import {Data} from './data';

export class Decade extends Data {

  fetchRouteFn = (parameters) => 'era/'+parameters.slug; // returns array of songs

  title = '(Decade)';
  slug = "";
  songs = [];
  years = [];
  year0 = 0;

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.title = "Decade: "+inbound.instanceSlug;
    this.slug = inbound.instanceSlug;
    this.songs = inbound;

    this.year0 = parseInt(inbound.instanceSlug.substring(0,4));
    this.years = [0,1,2,3,4,5,6,7,8,9].map(d => this.year0+d);
  }

}
