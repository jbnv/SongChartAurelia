import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

@inject(Router)
export class NavBar {

  constructor(router) {
    this.router = router;
  }

}
