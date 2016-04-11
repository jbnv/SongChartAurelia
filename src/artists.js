import {Collection} from './collection';

export class Artists extends Collection {

  fetchRouteFn = (parameters) => {
    if (parameters.filter) {
      return 'artists/'+parameters.filter;
    }
    return 'artists/count/100';
  }

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
    console.log("toggleFilters",this.showFilters);
  }

  massage = (inbound) => {
    
    if (this.parameters.filter) {
      this.filter = this.parameters.filter.replace(":","-");
    } else {
      this.filter = null;
    }

    if (inbound.filteredCount) {
      if (this.filter) {
        this.subtitle = `${inbound.filteredCount} of ${inbound.totalCount}`;
      } else {
        this.subtitle = `top ${inbound.filteredCount} of ${inbound.totalCount}`;
      }
    } else {
      this.subtitle = `all ${inbound.totalCount}`;
    }
  }
}
