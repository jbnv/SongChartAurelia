export class Columns {

  keys = [];

  // init: { slug: title }
  constructor(init) {
  	if (init) {
      Object.keys(init).forEach(key => {
        var title = init[key];
        this.keys.push(key);
  			this[key] = { 'title': title };
  		});
  	}
  }

  show() {
  	for (var index in arguments) {
  		this[arguments[index]].hidden = false;
  	}
  }

  showOnly() {
  	var columnsToShow = [];
  	for (var index in arguments) {
  		columnsToShow.push(arguments[index]);
  	}
    this.keys.forEach(key => {
      var column = init[key];
  		column.hidden = (columnsToShow.indexOf(key) == -1);
  	});
  }

  hide(slug) {
  	for (var index in arguments) {
  		this[arguments[index]].hidden = true;
  	}
  }

}
