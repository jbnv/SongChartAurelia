import {Collection} from './collection';

export class Search extends Collection {
  fetchRouteFn = (parameters) => 'search/'+parameters.slug;
  title = '';

  activate(parameters,routeConfig) {
    console.log("Search.activate()",parameters,routeConfig);
    this.title = parameters.slug;
    super.activate(parameters,routeConfig);
    this.sortByScore();
  }
}
