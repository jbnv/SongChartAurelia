import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import Transform from './transform';
import 'fetch';

function configForSongChartData(config) {
  config
    .useStandardConfiguration()
    .withBaseUrl('http://localhost:9702/');
}

@inject(HttpClient)
export class Data {
  title = "";
  fetchRoute = "";
  content = function() {} // subclass needs to override this

  massage(data) {}

  constructor(http) {
    http.configure(configForSongChartData);
    this.http = http;
  }

  activate(parameters,routeConfig) {
    let fetchRoute = this.fetchRoute;
    if (this.fetchRouteFn) {
      fetchRoute = this.fetchRouteFn(parameters);
    }
    return this.http.fetch(fetchRoute)
      .then(response => response.json())
      .then(data => {
        this.massage(data);
        routeConfig.navModel.setTitle(this.title);
      });
  }

  sort(column,fn) {

    if (this.sortColumn == column) {
      this.sortOrder = !this.sortOrder;
    } else {
      this.sortColumn = column;
      this.sortOrder = true;
    }

    if (!fn) {
      switch (column) {
        case 'title': fn = Transform.sortByTitle; break;
        case 'artistCount': fn = Transform.sortByArtistCount; break;
        case 'songCount': fn = Transform.sortBySongCount; break;
        case 'score': fn = Transform.sortByScore; break;
        default: fn = function(a,b) { return 0; }
      }
    }

    var outbound = this.content().sort(fn);
    if (!this.sortOrder) outbound = outbound.reverse();
    this.content(outbound);
  }


}
