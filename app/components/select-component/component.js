import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  classNames: 'custom-select',
  options: null,
  onDidInsertElement: Ember.on('didInsertElement', function() {
    this.$().trigger('change');
  }),
  change: function() {
    let value = this.$().val();
    this.sendAction('selectOption', value);
  }
});
