import {Data} from './data';

function colorStyle(countScale,aaScale) {
  let r = aaScale/countScale;
  let highlight = "";
  if (r >= 1.2) {
    highlight = "leader";
  } else if (r <= 0.8) {
    highlight = "lagger";
  }
  return highlight;
}

export class Eras extends Data {

  fetchRouteFn = (parameters) => 'eras'; // returns array of songs

  decadeCountScales = [];
  decadeAaScales = [];
  yearCountScales = [];
  yearAaScales = [];

  massage = (inbound) => {
    this.decadeCountScales = [];
    this.decadeAaScales = [];
    this.yearCountScales = [];
    this.yearAaScales = [];

    Object.keys(inbound.decades).sort().forEach(key => {

      let decade = inbound.decades[key];
      decade.slug = key;
      decade.title = key;

      this.decadeCountScales.push({
        title: decade.title,
        scale: decade.songCountScale
      });
      this.decadeAaScales.push({
        title: decade.title,
        scale: decade.songAdjustedAverageScale,
        highlight: colorStyle(decade.songCountScale,decade.songAdjustedAverageScale)
      });

    });

    Object.keys(inbound.years).sort().forEach(key => {

      let year = inbound.years[key];
      year.slug = key;
      year.title = key;

      var title = ""+year.title.substr(2,1)+" "+year.title.substr(3,1);
      this.yearCountScales.push({
        title: title,
        scale: year.songCountScale
      });
      this.yearAaScales.push({
        title: title,
        scale: year.songAdjustedAverageScale,
        highlight: colorStyle(year.songCountScale,year.songAdjustedAverageScale)
      });

    });
  }

}
