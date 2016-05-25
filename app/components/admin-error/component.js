import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['admin-error'],
  classNameBindings: ['hasError:admin-error--visible'],
  errorMessage: null,
  hasError: Ember.computed('errorMessage', function() {
    return !!this.get('errorMessage');
  })
});
