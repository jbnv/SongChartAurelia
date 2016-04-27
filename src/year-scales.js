import {Era} from './era';

export class YearScales {

  years = {};
  countScales = [];
  aaScales = [];

  activate(songs) {

    this.countScales = [];
    this.aaScales = [];

    for (let year = 1950; year <= 2016; year++) {
      let title = (""+year).substr(2,1)+" "+(""+year).substr(3,1);
      this.years[year] = {title:title, count:0, score:0};
    }

    songs.forEach(song => {
      if (!song.debutEra) {
        song.debutEra = new Era(song.debut);
      }
      let year = song.debutEra.year;
      if (year) {
        this.years[year].count++;
        this.years[year].score += song.score;
      }
    })

    let maxCount = 1; // ensure that divisor is always greater than 0
    let maxAA = 0.01;

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      year.aa = year.score / Math.sqrt(year.count);
      if (year.count > maxCount) maxCount = year.count;
      if (year.aa > maxAA) maxAA = year.aa;
    });

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      let r = (year.aa/maxAA)/(year.count/maxCount);
      let highlight = "";
      if (r >= 1.2) {
        highlight = "leader";
      } else if (r <= 0.8) {
        highlight = "lagger";
      }
      this.countScales.push({
        title: year.title, scale: year.count/maxCount
      });
      this.aaScales.push({
        title: year.title, scale: year.aa/maxAA, highlight: highlight
      });
    });

  }
}
