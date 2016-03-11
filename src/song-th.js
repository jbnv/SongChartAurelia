export class SongTableHeader {

  columns = {};

  constructor(columns) {
    this.columns = columns;
  }

  identity = angular.identity;

  init() {
    setFilter();
  }

  setFilter(p) {
    if (!p) {
      filter = {
        decade: 0, year: 0, month: 0
      };
      display = {
        decade: "Main Menu", year: "Year", month: "Month"
      };
      return;
    } else if (p.topByPeak) {
      resultTitle = 'Top Songs by Peak Position';
      dataParameters = { 'sortField':'-peakRank', 'top':100 };
      columns.show('rank','score');
      columns.hide('debutDate','projectedRank');
      //TODO
    } else if (p.topByDebut) {
      resultTitle = 'Top Songs by Debut Position';
      dataParameters = { 'sortField':'-debutRank', 'top':100 };
      columns.show('rank','score');
      columns.hide('debutDate','projectedRank');
      //TODO
    } else if (p.topByDuration) {
      resultTitle = 'Top Songs by Longevity';
      dataParameters = { 'sortField':'-duration', 'top':100 };
      columns.show('rank','score');
      columns.hide('debutDate','projectedRank');
      //TODO
    } else if (p.artist) {
      //TODO
    } else if (p.decade) {
      resultTitle = p.decade+'s';
      filter = {
        decade: p.decade, year: 0, month: 0, limit: 100
      };
      display = {
        decade: (p.decade ? ''+p.decade+'s' : "Decade"), year: "Year", month: "Month"
      };
      columns.show('rank');
      columns.hide('debutDate');
      columns.hide('projectedRank');
      columns.show('score');
      showIsDebut = false;
      dataParameters = {
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
      filter = {
        decade: p.decade, year: p.year, month: p.month
      };
      display = {
        decade: ''+p.decade+'s', year: ''+p.year, month: p.month ? months[p.month-1] : 'Select Month'
      };
      columns.show('rank');
      columns.hide('debutDate');
      dataParameters = { 'year': p.year }; //TODO add refresh
      if (p.month) {
        resultTitle = months[p.month-1]+' '+p.year;
        dataParameters.pagename = 'calendar:'+p.year+'-'+('0'+p.month).substr(0,2);
        dataParameters.month = p.month;
        showIsDebut = true;
        columns.show('projectedRank');
        columns.hide('score');
        dataParameters.sortField = 'projectedRank';
      } else {
        dataParameters.pagename = 'calendar:'+p.year;
        resultTitle = p.year;
        showIsDebut = false;
        columns.hide('projectedRank');
        columns.show('score');
        dataParameters.sortField = '-score';
        dataParameters.transformFn = function(songDataArray) {
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
      displayArray = [];
      resultTitle = '(Invalid or null filter)';
      return;
    }

  }

  setSort = function(predicate) {
    sortPredicate = predicate;
  }

  columns = new Columns({
    'rank': 'Rank',
    'title': 'Title',
    'artist': "Artist",
    'score': 'Score',
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
  columns.timeToPeak.hidden = true;

  dateString = function(scoreObject) {
    return scoreObject.year + '-' + ("00"+scoreObject.month).substr(-2,2);
  }

  function addAlert(path,title,request) {
    return function(httpResponse) {
      alertService.addResourceAlert(path,title,request,httpResponse);
      showAlertIcon = true;
    };
  }

  function getSongChartData(refresh)  {
    showSpinner = true;

    if (refresh) {
      dataParameters.refresh = true;
    }

    _resources.page.get(
      { 'fullname': 'data:'+dataParameters.pagename },
      function(pageData, responseHeaders) { // success callback
        displayArray = [];
        chartData = JSON.parse(pageData.content);
        angular.forEach(chartData, function(songDataArray) {
          var song = dataParameters.transformFn(songDataArray);
          displayArray.push(song);
          var request = { 'fullname': song.artist };
          var artistData = _resources.page.get(
            request,
            _artistService.bind(song), // returns success callback function
            addAlert('page/'+song.artist,"Artist Data",request) // returns error callback function
          );
          //TODO In month mode, check debut ranks on debut songs and mark if out of order.
        });
        setSort(dataParameters.sortField);
        console.log('sort',sortPredicate);
        showSpinner = false;
      },
      function(httpResponse) { // error callback
        alertService.addAlert({
          "title": "Failure to Get Score Data",
          "message": "The call to /scores failed to return data.",
          "data": httpResponse.data,
          'status':httpResponse.status,
          'headers':httpResponse.headers,
          'config':httpResponse.config
        });
        showAlertIcon = true;
        showSpinner = false;
      }
    );
    };

  reload = getSongChartData;

  // If n not set, limit = all.
  setCountLimit = function(n) {
    filter.limit = n;
  }

  openSongModal = function (song) {
    var modalInstance = $modal.open({
      templateUrl: 'songModal.html',
      controller: 'songModalController',
      size: '',
      resolve: {
        song: function () {
          return song;
        }
      }
    });
  };

  openAlertModal = function () {
    var modalInstance = $modal.open({
      templateUrl: 'alertModal.html',
      controller: 'alertModalController',
      size: ''
    });
  };

  init();
}
