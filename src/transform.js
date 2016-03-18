// Methods for sorting, filtering and transforming data for display.

exports.sortByTitle = function(a,b) {
  return a.title < b.title ? -1 : 1;
}

exports.sortByScore = function(a,b) {
  return (b.score || 0) - (a.score || 0);
}

exports.sortBySongCount = function(a,b) {
  return (b.songs.length || 0) - (a.songs.length || 0);
}

exports.sortByArtistCount = function(a,b) {
  return (b.artists.length || 0) - (a.artists.length || 0);
}
