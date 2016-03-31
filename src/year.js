import {Data} from './data';
import monthValues from './month-values';

export class Year extends Data {

  fetchRouteFn = (parameters) => 'era/'+parameters.slug; // returns array of songs

  title = '(Year)';
  year = 0;
  slug = "";
  songs = [];

  months = monthValues;

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.title = "Year: "+inbound.instanceSlug;
    this.year = parseInt(inbound.instanceSlug);
    this.slug = inbound.instanceSlug;
    this.songs = inbound;
  }

}
