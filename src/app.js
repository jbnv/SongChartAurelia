export class App {
  configureRouter(config, router) {
    config.title = 'Song Charts';
    config.map([
      { route: ['','welcome'], name: 'welcome', moduleId: './welcome', nav: true, title:'Welcome' },
      { route: 'artists',      name: 'artists', moduleId: './artists', nav: true, title:'Artists' },
      { route: 'genres',       name: 'genres', moduleId: './genres', nav: true, title:'Genres' },
      { route: 'locations',    name: 'locations', moduleId: './locations', nav: true, title:'Locations' },
      { route: 'songs',        name: 'songs', moduleId: './songs', nav: true, title:'Songs' },
      { route: 'sources',      name: 'sources', moduleId: './sources', nav: true, title:'Sources' }
    ]);

    this.router = router;
  }
}
