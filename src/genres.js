import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {configForSongChartData} from './data';

@inject(HttpClient)
export class Genres {
  heading = 'Genres';
  genres = {};
  keys = [];

  constructor(http) {
    http.configure(configForSongChartData);
    this.http = http;
  }

  activate() {
    return this.http.fetch('genres')
      .then(response => response.json())
      .then(genres => { this.genres = genres; this.keys = Object.keys(genres); });
  }
}
