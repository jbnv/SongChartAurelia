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

  massage = (inbound) => {
    this.decades = inbound.decades;
    this.content = [];
    Object.keys(inbound.decades).sort().forEach(key => {
      let e = inbound.decades[key];
      e.slug = key;
      e.title = key;
      this.content.push(e);
    });
    this.aggregate();
  }

}
