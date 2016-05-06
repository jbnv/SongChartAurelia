import numeral from 'numeral';

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

export class ScaleGraph {

  items = [];

  saa(o) {
    return numeral(o.songAdjustedAverage || 0).format("0.00")
  }

  activate(items) {
    // items: object (associative array)

    // Determine maximum value.
    let max = 1;
    var outbound = [];
    Object.keys(items).forEach(key => {
      let item = items[key];
      item.slug = key;
      item = this.transformFn(item);
      if (item.value > max) max = item.value;
      outbound.push(item);
    });

    // Project to array.
    if (max > 0) {
      outbound.forEach(item => {
        item.scale = 1.0 * item.value / max;
        item.highlight =  colorStyle(item.songCountScale,item.songAdjustedAverageScale);
      });
    }

    this.items = outbound
      .sort((a,b) => {
        return ((a || {}).ordinal || 0) - ((b || {}).ordinal || 0);
      });

  }
}
