import {Columns} from './columns';

export class ArtistTable {

  artists = [];

  columns = new Columns({
    'rank': 'Rank',
    'title': 'Name',
    'complete': 'Complete',
    'songCount': 'Songs',
    'score': 'Score',
    'songAdjustedAverage': 'SAA',
  });

  filter = {};

  //!! What is the purpose of this?
  dataParameters = {};

  // A subtitle for the filtered results.
  subtitle = "";

  init() {
    this.setFilter();
  }

  setFilter(p) {
    if (!p) {
      this.filter = {};
      return;
    } else {
      console.log('Clearing display array.');
      this.displayArray = [];
      this.subtitle = '(Invalid or null filter)';
      return;
    }

  }

  setSort = function(predicate) {
    this.sortPredicate = predicate;
  }

  addAlert(path,title,request) {
    return function(httpResponse) {
      // alertService.addResourceAlert(path,title,request,httpResponse);
      this.showAlertIcon = true;
    };
  }

  // If n not set, limit = all.
  setCountLimit = function(n) {
    if (!this.filter) this.filter = {};
    this.filter.limit = n;
  }

  openSongModal = function (artist) {}; //empty for now

  openAlertModal = function () {}; //empty for now

  // Lifecycle methods

  constructor() {
    this.init();
  }

  bind(bindingContext, overrideContext) {
  }

  activate(data) {
    this.artists = data.artists;
    // Make sure that each artist has good data.
    this.artists.forEach(function(artist) {
      if (!artist.artists) artist.artists = [];
    });
    if (data.showOnly) {
      Columns.prototype.showOnly.apply(this.columns,data.showOnly);
    } else if (data.hide) {
      Columns.prototype.hide.apply(this.columns,data.hide);
    }

  }
}
