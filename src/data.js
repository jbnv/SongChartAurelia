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
  subtitle = "";
  fetchRoute = "";
  slug = "";
  parameters = {};

  massage(data) {}

  constructor(http) {
    if (http) { http.configure(configForSongChartData); }
    this.http = http;
  }

  activate(parameters,routeConfig) {
    this.parameters = parameters;
    this.slug = parameters.slug;
    let fetchRoute = this.fetchRoute;
    if (this.fetchRouteFn) {
      fetchRoute = this.fetchRouteFn(parameters);
    }
    return this.http.fetch(fetchRoute)
      .then(response => response.json())
      .then(data => {
        data.instanceSlug = data.instanceSlug || parameters.slug;
        Object.keys(data).forEach(key => this[key] = data[key]);
        this.massage(data);
        routeConfig.navModel.setTitle(this.title);
      });
  }

}
