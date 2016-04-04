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

  massage = (inbound) => {
    this.content = [];
    Object.keys(inbound.years).sort().forEach(key => {
      let year = inbound.years[key];
      year.slug = key;
      year.title = key;
      this.content.push(year);
    });
    this.aggregate();
  }

}
