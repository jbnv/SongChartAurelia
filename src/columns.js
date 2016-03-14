
export class Columns {

  _content = {};

  // init: { slug: title }
  constructor(init) {
  	if (init) {
      Object.keys(init).forEach(key => {
        var title = init[key];
  			this._content[key] = { 'title': title };
  		});
  	}
  }

  show() {
  	for (var index in arguments) {
  		this._content[arguments[index]].hidden = false;
  	}
  }

  showOnly() {
  	var columnsToShow = [];
  	for (var index in arguments) {
  		columnsToShow.push(arguments[index]);
  	}
    Object.keys(this._content).forEach(key => {
      var column = init[key];
  		column.hidden = (columnsToShow.indexOf(key) == -1);
  	});
  }

  hide(slug) {
  	for (var index in arguments) {
  		this._content[arguments[index]].hidden = true;
  	}
  }

}
