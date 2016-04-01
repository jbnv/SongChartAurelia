import {Data} from './data';

export class Years extends Data {

  fetchRouteFn = (parameters) => 'eras'; // returns array of songs

  title = 'Years';
  years = [];
  maxSongCount = 0;
  maxArtistCount = 0;

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    Object.keys(inbound.years).sort().forEach(key => {
      let songCount = inbound.years[key];
      let artistCount = 0; //LATER
      this.years.push({slug:key,songCount:songCount});
      if (songCount > this.maxSongCount) this.maxSongCount = songCount;
      if (artistCount > this.maxArtistCount) this.maxArtistCount = artistCount;
    });
  }

}
