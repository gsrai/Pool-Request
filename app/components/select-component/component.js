import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  classNames: 'custom-select',
  options: null,
  onDidInsertElement: Ember.on('didInsertElement', function() {
    let id = this.get('elementId');
    Ember.$(`#${id}`).trigger('change');
  }),
  change: function() {
    let value = document.getElementById(this.get('elementId')).value;
    this.sendAction('selectOption', value);
  }
});
