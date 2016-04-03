import {Columns} from './columns';
import {Collection} from './collection';

export class Decades extends Collection {

  fetchRouteFn = (parameters) => 'eras'; // returns array of songs

  artists = [];

  columns = new Columns({
    'title': 'Name',
    'songCount': 'Songs',
    'score': 'Score',
    'songAdjustedAverage': 'SAA',
  });

  massage = (inbound) => {
    this.content = [];
    Object.keys(inbound.decades).forEach(key => {
      let decade = inbound.decades[key];
      decade.slug = key;
      decade.title = key;
      this.content.push(decade);
    });
    this.aggregate();
    this.content = this.content.sort((a,b) => a.slug > b.slug);
  }

}
