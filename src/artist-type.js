import {Data} from './data';

export class ArtistType extends Data {

  fetchRouteFn = (parameters) => 'artist-type/'+parameters.slug;

  typeTitle = '(ArtistType)';
  artists = [];

  massage = (inbound) => {
    this.typeTitle = inbound.title;
    this.artists = inbound.artists;
  }

}
