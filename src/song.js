import {Data} from './data';

export class Song extends Data {

  fetchRouteFn = (parameters) => 'song/'+parameters.slug;

  massage = (inbound) => {

    // Pull out ranks and add them to their respective entities.
    // (Could this maybe go on the server side?)
    Object.keys(this.ranks).forEach(key => {
      let rank = this.ranks[key];
      let keyParts = key.split(":");
      let typeSlug = keyParts[0];
      let instanceSlug = keyParts[1];
      let entity = null;
      switch (typeSlug) {
        case "artist":
          entity = this.artists.filter(a => (a || {}).slug == instanceSlug)[0];
          break;
        case "genre":
          entity = this.genres.filter(a => (a || {}).instanceSlug == instanceSlug)[0];
          break;
        case "playlist":
          entity = this.playlists.filter(a => (a || {}).instanceSlug == instanceSlug)[0];
          break;
        case "source":
          entity = this.sources.filter(a => (a || {}).instanceSlug == instanceSlug)[0];
          break;
        case "decade":
          entity = this.decade = {"instanceSlug":key};
          break;
        case "year":
          entity = this.year = {"instanceSlug":key};
          break;
      }
      if (entity) {
        entity.rank = rank.rank;
        entity.count = rank.total;
      }
    });

  }
}
