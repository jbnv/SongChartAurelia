import {Data} from './data';

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

  massage = (inbound) => {

    if (this.parameters.filter) {
      this.filter = this.parameters.filter.replace(":","-");
    } else {
      this.filter = null;
    }

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
}
