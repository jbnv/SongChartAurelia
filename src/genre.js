import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {configForSongChartData} from './data';

@inject(HttpClient)
export class Genre {
  title = '(Genre)';
  parents = [];
  children = [];

  constructor(http) {
    http.configure(configForSongChartData);
    this.http = http;
  }

  activate() {
    return this.http.fetch('genre/'+slug)
      .then(response => response.json())
      .then(genre => { this.genres = genres; this.keys = Object.keys(genres); });
  }
}
