import {Columns} from './columns';
import {Collection} from './collection';

export class Decades extends Collection {

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

    Object.keys(inbound.decades).sort().forEach(key => {

      let decade = inbound.decades[key];
      decade.slug = key;
      decade.title = key;
      this.content.push(decade);

      this.countScales.push({title: decade.title, scale: decade.songCountScale});
      this.aaScales.push({title: decade.title, scale: decade.songAdjustedAverageScale});

    });

    this.aggregate();
  }

}
