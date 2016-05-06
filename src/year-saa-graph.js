import {ScaleGraph} from './scale-graph';
import {useView} from 'aurelia-framework';

function title(year) {
  return (""+year.slug).substr(2,1)+" "+(""+year.slug).substr(3,1);
}

@useView('./scale-graph.html')
export class YearSaaGraph extends ScaleGraph {

  transformFn = function(year) {
    return {
      "title": title(year),
      "ordinal": year.slug,
      "value": year.songAdjustedAverage,
      "route": "year/"+year.slug,
      "tooltip": year.slug+": "+this.saa(year)
    };
  }
}
