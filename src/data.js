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

  refresh() {
    let fetchRoute = this.fetchRoute;
    if (this.fetchRouteFn) {
      fetchRoute = this.fetchRouteFn(this.parameters);
    }
    return this.http.fetch(fetchRoute)
      .then(response => response.json())
      .then(data => {
        data.instanceSlug = data.instanceSlug || this.slug;
        Object.keys(data).forEach(key => this[key] = data[key]);
        this.massage(data);
        this.navModel.setTitle(this.title);
      });
  }

  activate(parameters,routeConfig) {
    this.parameters = parameters;
    this.slug = parameters.slug;
    this.navModel = routeConfig.navModel;
    return this.refresh();
  }

}
