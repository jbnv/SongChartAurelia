import {Collection} from './collection';

export class Artists extends Collection {
  fetchRoute = 'artists';
  title = 'Artists';

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
    console.log("toggleFilters",this.showFilters);
  }
}
