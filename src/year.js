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
    this.songs = this.songs || [];
    this.months = this.months || [];
    this.previous.route = `month/${this.previous.slug}`;
    this.next.route = `month/${this.next.slug}`;
    this.pageNavModel = {
      previous: this.previous,
      next: this.next,
      pages: this.months.map(function(m) { return { title: m.title.substring(0,3), route: "month/"+m.slug };})
    };
  }

}
