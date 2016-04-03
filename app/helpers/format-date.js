import Ember from 'ember';
import moment from 'moment';

export function formatDate(date) {
  return moment(date[0]).format('DD/MM/YY');
}

export default Ember.Helper.helper(formatDate);
