import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
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

  massage(data) {}

  constructor(http) {
    http.configure(configForSongChartData);
    this.http = http;
  }

  activate(parameters) {
    console.log(parameters);
    let fetchRoute = this.fetchRoute;
    if (this.fetchRouteFn) {
      fetchRoute = this.fetchRouteFn(parameters);
    }
    return this.http.fetch(fetchRoute)
      .then(response => response.json())
      .then(this.massage);
  }
}
