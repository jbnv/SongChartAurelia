import {Data} from './data';

export class Song extends Data {

  fetchRouteFn = (parameters) => 'song/'+parameters.slug;

}
