import numeral from 'numeral';

export class DecimalValueConverter {
  toView(value,places) {
    return numeral(value).format('0.0000'.substring(0,places+2));
  }
}
