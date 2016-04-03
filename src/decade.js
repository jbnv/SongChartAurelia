import {Data} from './data';

export class Decade extends Data {

  fetchRouteFn = (parameters) => 'era/'+parameters.slug; // returns array of songs

  score = 0.00;
  songAdjustedAverage = 0.00;

  songs = [];
  years = [];
  year0 = 0;

  previous = {};
  next = {};

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.songs = this.songs || [];
    this.years = this.years || [];
    this.year0 = parseInt(inbound.instanceSlug.substring(0,4));
  }

}
