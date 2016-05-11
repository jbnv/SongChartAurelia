import {Era} from './era';

export class YearScales {

  years = {};
  countScales = [];
  aaScales = [];

  activate(songs) {

    this.years = {};

    for (let year = 1950; year <= 2016; year++) {
      let title = (""+year).substr(2,1)+" "+(""+year).substr(3,1);
      this.years[year] = {title:title, songCount:0, score:0};
    }

    songs.forEach(song => {
      if (!song.debutEra) {
        song.debutEra = new Era(song.debut);
      }
      let year = song.debutEra.year;
      if (year) {
        this.years[year].songCount++;
        this.years[year].score += song.score;
      }
    })

    let maxCount = 1; // ensure that divisor is always greater than 0
    let maxAA = 0.01;

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      year.songAdjustedAverage = year.score / Math.sqrt(year.songCount);
      if (year.songCount > maxCount) maxCount = year.songCount;
      if (year.songAdjustedAverage > maxAA) maxAA = year.songAdjustedAverage;
    });

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      let r = (year.songAdjustedAverage/maxAA)/(year.songCount/maxCount);
      year.highlight = "";
      if (r >= 1.2) {
        year.highlight = "leader";
      } else if (r <= 0.8) {
        year.highlight = "lagger";
      }
    });

  }
}
