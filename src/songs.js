import {Data} from './data';

export class Songs extends Data {
  fetchRoute = 'songs/count/100';
  subtitle = "";

  massage = (inbound) => {
    if (inbound.filteredCount) {
      this.subtitle = `top ${inbound.filteredCount} of ${inbound.totalCount}`;
    } else {
      this.subtitle = `${inbound.totalCount}`;
    }
  }
}
