import {Data} from './data';

export class ArtistType extends Data {

  fetchRouteFn = (parameters) => 'artist-type/'+parameters.slug;

  typeTitle = '(ArtistType)';

  artistTableModel = {
    showOnly: [
      'rank','title','complete','songCount','score','songAdjustedAverage'
    ]
  };

  massage = (inbound) => {
    this.typeTitle = inbound.title;
    this.artistTableModel.artists = inbound.artists;
  }

}
