import {Columns} from './columns';
import {Collection} from './collection';

export class Years extends Collection {

  fetchRouteFn = (parameters) => 'eras'; // returns array of songs

  columns = new Columns({
    'title': 'Name',
    'songCount': 'Songs',
    'score': 'Score',
    'songAdjustedAverage': 'SAA',
  });

  countScales = [];
  aaScales = [];

  massage = (inbound) => {
    this.content = [];
    this.countScales = [];
    this.aaScales = [];

    Object.keys(inbound.years).sort().forEach(key => {

      let year = inbound.years[key];
      year.slug = key;
      year.title = key;
      this.content.push(year);

      var title = ""+year.title.substr(2,1)+" "+year.title.substr(3,1);
      this.countScales.push({title: title, scale: year.songCountScale});
      this.aaScales.push({title: title, scale: year.songAdjustedAverageScale});

    });

    this.aggregate();
  }

}
