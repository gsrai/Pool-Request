import Ember from 'ember';

export default Ember.Controller.extend({
  section: 'admin-challenging',
  actions: {
    setSection() {
      this.send('setSection');
    },
    transitionToGame() {
      this.transitionToRoute('ladder');
    }
  }
});
