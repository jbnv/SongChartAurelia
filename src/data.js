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

  activate() {
    return this.http.fetch(this.fetchRoute)
      .then(response => response.json())
      .then(this.massage);
  }
}
