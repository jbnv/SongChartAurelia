import {Data} from './data';
import Transform from './transform';

export class Playlist extends Data {

  fetchRouteFn = (parameters) => 'playlist/'+parameters.slug;

  title = '(Playlist)';
  description = "";
  songListModel = {};

  constructor(http) {
    super(http);
  }

  massage = (inbound) => {
    this.title = inbound.title;
    this.description = inbound.description;

    this.songListModel = {
      "songs": inbound.songs,
      "showOnly": inbound.columns || ['rank','title','artist','score','debutDate'],
      "sort": inbound.sort || "score"
    }
  }

}
