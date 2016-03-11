export class SongTableRow {

  rank = 0;
  title = "";
  artists = [];
  debutDate = "";
  score = "";
  projectedRank = 0;
  debutRank = 0;
  peakRank = 0;
  duration = 0;
  timeToPeak =  0;

  columns = {};

  constructor(song,columns) {
    this.columns = columns;

    this.rank = song.rank;
    this.title = song.title;
    this.artists = song.artists;
    this.debutDate = song.debutDate;
    this.score = song.score;
    this.projectedRank = song.projectedRank;
    this.debutRank = song.debutRank;
    this.peakRank = song.peakRank;
    this.duration = song.duration;
    this.timeToPeak =  song.timeToPeak;
  }

}
