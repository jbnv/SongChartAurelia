export class Era {

  slug = "";
  decade = "";
  year = 0;
  month = "";

  constructor(slug) {
		this.slug = slug;
		if (/^\d\d\d0s$/.test(slug)) {
			this.decade = parseInt(slug.match(/\d\d\d0/)[0]);
		} else if (/^\d\d\d\d$/.test(slug)) {
      let year = parseInt(slug);
      this.decade = year - (year%10);
			this.year = year;
		} else if (/^\d\d\d\d-\d\d$/.test(slug)) {
			let numbers = slug.match(/\d+/g);
      let year = parseInt(numbers[0]);
      this.decade = year - (year%10);
			this.year = year;
			this.month = parseInt(numbers[1]);
		}
	}

}
