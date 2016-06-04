import {Columns} from './columns';
import {Collection} from './collection';

export class ArtistTable extends Collection {

  artists = [];

  columns = new Columns({
    'rank': 'Rank',
    'title': 'Name',
    'type': 'Type',
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
    super();
    this.init();
  }

  bind(bindingContext, overrideContext) {
  }

  activate(data) {

    this.content = data.artists;

    // Make sure that each artist has good data.
    this.content.forEach(artist => {
      if (typeof artist === 'string') artist = {instanceSlug:artist};
      if (!artist.instanceSlug) artist.instanceSlug = artist.slug;
      if (!artist.songs) artist.songs = [];
      if (!this.columns.songAdjustedAverage.hidden && !artist.songAdjustedAverage) {
        artist.songAdjustedAverage = artist.score;
      }
    });

    this.aggregate();

    if (data.showOnly) {
      Columns.prototype.showOnly.apply(this.columns,data.showOnly);
    } else if (data.hide) {
      Columns.prototype.hide.apply(this.columns,data.hide);
    }

    this.sort('songAdjustedAverage');

  }
}
