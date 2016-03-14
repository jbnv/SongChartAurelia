export class App {
  configureRouter(config, router) {
    config.title = 'Song Charts';
    config.map([
      { route: ['','welcome'],   name: 'welcome', moduleId: 'welcome', title: 'Welcome' },
      { route: 'search',         name: 'search', moduleId: 'search', title: 'Search' },
      { route: 'artist/:slug',   name: 'artist', moduleId: 'artist', title: 'Artist' },
      { route: 'artists',        name: 'artists', moduleId: 'artists', title: 'Artists' },
      { route: 'genre/:slug',    name: 'genre', moduleId: 'genre', title: 'Genre' },
      { route: 'genres',         name: 'genres', moduleId: 'genres', title: 'Genres' },
      { route: 'location/:slug', name: 'location', moduleId: 'location', title: 'Location' },
      { route: 'locations',      name: 'locations', moduleId: 'locations', title: 'Locations' },
      { route: 'playlist/:slug', name: 'playlist', moduleId: 'playlist', title: 'Playlist' },
      { route: 'playlists',      name: 'playlists', moduleId: 'playlists', title: 'Playlists' },
      { route: 'song/:slug',     name: 'song', moduleId: 'song', title: 'Song' },
      { route: 'songs',          name: 'songs', moduleId: 'songs', title: 'Songs' },
      { route: 'source/:slug',   name: 'source', moduleId: 'source', title: 'Source' },
      { route: 'sources',        name: 'sources', moduleId: 'sources', title: 'Sources' }
    ]);

    this.router = router;
  }
}
