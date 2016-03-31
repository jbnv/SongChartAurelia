// Methods for sorting, filtering and transforming data for display.
// This file should be the same between the data and the app.

exports.sortByRank = function(a,b) {
    return (a.rank || 0) - (b.rank || 0);
}

exports.sortByTitle = function(a,b) {
  var titleA = (""+a.title).replace(/[^\w\s]/g,"");
  var titleB = (""+b.title).replace(/[^\w\s]/g,"");
  return titleA < titleB ? -1 : 1;
}

exports.sortByScore = function(a,b) {
  return (b.score || 0) - (a.score || 0);
}

exports.sortBySongCount = function(a,b) {
  return (b.songs || []).length - (a.songs || []).length;
}

exports.sortByArtistCount = function(a,b) {
  return (b.artists || []).length - (a.artists || []).length;
}

exports.sortBySAA = function(a,b) {
  return (b.songAdjustedAverage || 0) - (a.songAdjustedAverage || 0);
}

exports.sortByAAA = function(a,b) {
  return (b.artistAdjustedAverage || 0) - (a.artistAdjustedAverage || 0);
}
