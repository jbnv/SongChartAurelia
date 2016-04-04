import {Data} from './data';

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

  songTableModel = {
    'showOnly':[
      'rank','title','role','source','score',
      'debutDate','debutRank','peakRank','duration'
    ]
  }

  massage = (inbound) => {
    this.type = inbound.type || {slug: "", title: "NOT SET"};
    this.genres = inbound.genres || [];
    this.songTableModel.songs = inbound.songs || [];
    this.score = inbound.score || 0.00;
    this.songAdjustedAverage = inbound.songAdjustedAverage || 0.00;
  }

}
