import {Data} from './data';
import * as Transform from './transform';

export class Collection extends Data {

  content = [];
  sortColumn = "title";
  sortOrder = true; // true = normal; false = reverse;

  sort(column,fn) {

    if (this.sortColumn == column) {
      this.sortOrder = !this.sortOrder;
    } else {
      this.sortColumn = column;
      this.sortOrder = true;
    }

    if (!fn) {
      switch (column) {
        case 'rank': fn = Transform.sortByRank; break;
        case 'title': fn = Transform.sortByTitle; break;
        case 'artistCount': fn = Transform.sortByArtistCount; break;
        case 'songCount': fn = Transform.sortBySongCount; break;
        case 'debutDate': fn = Transform.sortByDebutDate; break;
        case 'score': fn = Transform.sortByScore; break;
        case 'songAdjustedAverage': fn = Transform.sortBySAA; break;
        case 'artistAdjustedAverage': fn = Transform.sortByAAA; break;
        default: fn = function(a,b) { return 0; }
      }
    }

    var outbound = (this.content || []).sort(fn);
    if (!this.sortOrder) outbound = outbound.reverse();
    this.content = outbound;
  }

  sortByRank()        { this.sort("rank"); }
  sortByTitle()       { this.sort("title"); }
  sortByDebutDate()   { this.sort("debutDate"); }
  sortBySongCount()   { this.sort("songCount"); }
  sortByArtistCount() { this.sort("artistCount"); }
  sortByScore()       { this.sort("score"); }
  sortBySAA()         { this.sort("songAdjustedAverage"); }
  sortByAAA()         { this.sort("artistAdjustedAverage"); }

  massage = (inbound) => {
    this.content = inbound;
    this.content.forEach(item => item.visible = true);
  }

}
