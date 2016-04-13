export class RankBar {

  rank = 0;
  count = 1;

  activate(data) {
    if (!data) return;
    this.rank = data.rank;
    this.count = data.count;
  }

}
