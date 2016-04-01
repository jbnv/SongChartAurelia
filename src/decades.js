import {Data} from './data';

export class Decades extends Data {

  fetchRouteFn = (parameters) => 'eras'; // returns array of songs

  title = 'Decades';
  decades = [];
  maxSongCount = 0;
  maxArtistCount = 0;

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    Object.keys(inbound.decades).forEach(key => {
      let songCount = inbound.decades[key];
      let artistCount = 0; //LATER
      this.decades.push({slug:key,songCount:songCount});
      if (songCount > this.maxSongCount) this.maxSongCount = songCount;
      if (artistCount > this.maxArtistCount) this.maxArtistCount = artistCount;
    });
    this.decades = this.decades.sort((a,b) => a.slug > b.slug);
  }

}
