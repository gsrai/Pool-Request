import Ember from 'ember';
import moment from 'moment';

export function formatDate(date) {
  if (date && date[0]) {
    return moment(date[0]).format('DD/MM/YY');
  }
  return '';
}

export default Ember.Helper.helper(formatDate);
