import {Data} from './data';

export class Genre extends Data {

  fetchRouteFn = (parameters) => 'genre/'+parameters.slug;

  title = '(Genre)';
  parents = [];
  children = [];

  constructor(http) {
    super(http);

  }

  massage = (inbound) => {
    this.title = inbound.title;
    this.parents = inbound.parents;
    this.children = inbound.children;
  }
  
}
