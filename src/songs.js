import {Data} from './data';
import {Era} from './era';

export class Songs extends Data {

  sampleSize = 100;

  fetchRouteFn = (parameters) => {
    if (!parameters.filter)
      return 'songs/count/100';
    if (parameters.filter === "sample")
      return `songs/sample/${this.sampleSize}`;
    return 'songs/'+parameters.filter;
  }

  //TEMP Local copy -- wire to use the one in SongTable.
  shuffle() {
    // Durstenfeld shuffle algorithm.
    console.log("shuffle() BEGIN"); //TEMP
    for (var i = this.items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.items[i];
      this.items[i] = this.items[j];
      this.items[j] = temp;
    }
    console.log("shuffle() DONE",this.items); //TEMP
    return true; // needed for cross-component functionality
  }

  subtitle = "";

  setSubtitle(inbound) {

    if (this.parameters.filter === "sample") {
      this.subtitle = this.sampleSize;
      return;
    }

    if (this.parameters.filter === "unscored") {
      this.subtitle = `${inbound.filteredCount} of ${inbound.totalCount}`;
      return;
    }

    if (inbound.filteredCount) {
      this.subtitle = `top ${inbound.filteredCount} of ${inbound.totalCount}`;
      return;
    }

    this.subtitle = `${inbound.totalCount}`;

  }

  setYearGraph() {

    this.years = {};
    for (let year = 1950; year <= 2016; year++) {
      let title = (""+year).substr(2,1)+" "+(""+year).substr(3,1);
      this.years[year] = {title:title, count:0, score:0};
    }

    this.items.forEach(song => {
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

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      if (year.count > maxCount) maxCount = year.count;
    });

    this.countScales = [];

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      this.countScales.push({
        title: year.title,
        scale: year.count/maxCount,
        route: "year/"+yearNumber
      });
    });

  }

  massage = (inbound) => {

    if (this.parameters.filter) {
      this.filter = this.parameters.filter.replace(":","-");
    } else {
      this.filter = null;
    }

    this.setSubtitle(inbound);
    this.setYearGraph();

  }
}
