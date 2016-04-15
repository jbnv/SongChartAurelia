import {Data} from './data';
import numeral from 'numeral';

export class Artist extends Data {

  fetchRouteFn = (parameters) => 'artist/'+parameters.slug;

  title = '(Artist)';
  complete = false;
  active = false;
  type = {slug: "", title: "NOT SET"};
  genres = [];
  birth = "";
  death = "";
  origin = "";
  songs = [];
  score = 0.00;
  songAdjustedAverage = 0.00;
  status = "";

  massage = (inbound) => {
    this.type = inbound.type || {slug: "", title: "NOT SET"};
    this.status
      = inbound.complete ? "complete"
      : inbound.active ? "active" : "incomplete";
    this.genres = inbound.genres || [];
    this.members = inbound.members || [];
    this.xref = inbound.xref || [];
    this.tags = inbound.tags || [];
    this.songTableModel = {
      'showOnly':[
        'rank','title','role','source','score',
        'debutDate','debutRank','peakRank','duration'
      ]
    };
    this.songTableModel.songs = inbound.songs || [];
    this.score = numeral(inbound.score || 0).format("0.00");
    this.songAdjustedAverage = numeral(inbound.songAdjustedAverage || 0).format("0.00");

    // Pull out ranks and add them to their respective entities.
    // (Could this maybe go on the server side?)
    Object.keys(this.ranks).forEach(key => {
      let rank = this.ranks[key];
      let keyParts = key.split(":");
      let typeSlug = keyParts[0];
      let instanceSlug = keyParts[1];
      let entity = null;
      switch (typeSlug) {
        case "genre":
          entity = this.genres.filter(a => a.instanceSlug == instanceSlug)[0];
          break;
        case "origin":
          entity = this.origin || {};
          break;
        case "tag":
          entity = this.tags.filter(a => a.instanceSlug == instanceSlug)[0];
          break;
      }
      if (entity) {
        entity.rank = rank.rank;
        entity.count = rank.total;
      }
    });

  } // massage()
}
