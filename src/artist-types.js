import {Collection} from './collection';

export class ArtistTypes extends Collection {
  fetchRoute = 'artist-types';
  title = 'Artist Types';
  maxArtistCount = 0;
  maxArtistAdjustedAverage = 0;

  massage = (inbound) => {
    this.content = inbound;
    this.sortByTitle();
    console.log(inbound);
    inbound.forEach(item => {
      if (item.artistCount > this.maxArtistCount) {
        this.maxArtistCount = item.artistCount;
      }
      if (item.artistAdjustedAverage > this.maxArtistAdjustedAverage) {
        this.maxArtistAdjustedAverage = item.artistAdjustedAverage;
      }
    });
  }
}
