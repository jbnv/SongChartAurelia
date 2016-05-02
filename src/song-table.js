import {Columns} from './columns';
import {Collection} from './collection';
import {Era} from './era';

export class SongTable extends Collection {

  columns = new Columns({
    'rank': 'Rank',
    'title': 'Title',
    'artist': "Artist",
    'score': 'Score',
    'role': 'Role',
    'source': 'Source',
    'projectedRank': "Projected Rank",
    'debutDate': "Debut Date",
    'debutRank': "Debut Rank",
    'peakRank': "Peak Rank",
    'duration': "Duration (Months)",
    'k': "Coefficient Constant",
    'a': "Ascent Coefficient",
    'b': "Descent Coefficient",
    'timeToPeak': "Time to Peak"
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
    } else if (p.topByPeak) {
      this.subtitle = 'Top Songs by Peak Position';
      this.dataParameters = { 'sortField':'-peakRank', 'top':100 };
      this.columns.show('rank','score');
      this.columns.hide('debutDate','projectedRank');
      //TODO
    } else if (p.topByDebut) {
      this.subtitle = 'Top Songs by Debut Position';
      this.dataParameters = { 'sortField':'-debutRank', 'top':100 };
      this.columns.show('rank','score');
      this.columns.hide('debutDate','projectedRank');
      //TODO
    } else if (p.topByDuration) {
      this.subtitle = 'Top Songs by Longevity';
      this.dataParameters = { 'sortField':'-duration', 'top':100 };
      this.columns.show('rank','score');
      this.columns.hide('debutDate','projectedRank');
      //TODO
    } else if (p.artist) {
      //TODO
    } else if (p.decade) {
      this.subtitle = p.decade+'s';
      this.filter = {
        decade: p.decade, year: 0, month: 0, limit: 100
      };
      this.columns.show('rank','score');
      this.columns.hide('debutDate','projectedRank');
      this.showIsDebut = false;
      this.dataParameters = {
        'pagename': 'calendar:'+p.decade+'s',
        'decade': p.decade,
        'sortField':'-score',
        'transformFn': function(songDataArray) {
          return {
            rank: 0, //TODO
            slug: songDataArray[0],
            title: songDataArray[1],
            artist: songDataArray[2],
            score: songDataArray[3],
            debutRank: songDataArray[4],
            peakRank: songDataArray[5],
            duration: songDataArray[6]
          };
        }
      }; //TODO add refresh
      getSongChartData();
    } else if (p.year) {
      p.decade = p.year - p.year%10;
      this.filter = {
        decade: p.decade, year: p.year, month: p.month
      };
      this.columns.show('rank');
      this.columns.hide('debutDate');
      this.dataParameters = { 'year': p.year }; //TODO add refresh
      if (p.month) {
        this.subtitle = months[p.month-1]+' '+p.year;
        this.dataParameters.pagename = 'calendar:'+p.year+'-'+('0'+p.month).substr(0,2);
        this.dataParameters.month = p.month;
        this.showIsDebut = true;
        this.columns.show('projectedRank');
        this.columns.hide('score');
        this.dataParameters.sortField = 'projectedRank';
      } else {
        this.dataParameters.pagename = 'calendar:'+p.year;
        this.subtitle = p.year;
        this.showIsDebut = false;
        this.columns.hide('projectedRank');
        this.columns.show('score');
        this.dataParameters.sortField = '-score';
        this.dataParameters.transformFn = function(songDataArray) {
          return {
            rank: 0, //TODO
            slug: songDataArray[0],
            title: songDataArray[1],
            artist: songDataArray[2],
            score: songDataArray[3],
            debutRank: songDataArray[4],
            peakRank: songDataArray[5],
            duration: songDataArray[6]
          };
        };
      }
      getSongChartData();
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

  dateString(scoreObject) {
    return scoreObject.year + '-' + ("00"+scoreObject.month).substr(-2,2);
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

  openSongModal = function (song) {}; //empty for now

  openAlertModal = function () {}; //empty for now

  // Lifecycle methods

  constructor() {
    super(); // if you are extending a class you must call super() before accessing 'this'
    this.columns.timeToPeak.hidden = true;
    this.init();
  }

  bind(bindingContext, overrideContext) {
  }

  activate(data) {

    this.content = data.songs || [];

    // Make sure that each song has good data.
    this.content.forEach(function(song) {
      if (!song.artists) song.artists = [];
      if (!song.debutEra) song.debutEra = new Era(song.debut);
      console.log(song.debutEra.type);
    });

    if (data.showOnly) {
      Columns.prototype.showOnly.apply(this.columns,data.showOnly);
    }

    this.sort(data.sort || 'score');
  }

  titleArtists(artists) {
    return artists.filter(a => a.roleSlug === true);
  }
}
