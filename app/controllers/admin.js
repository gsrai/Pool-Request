import Ember from 'ember';

export default Ember.Controller.extend({
  section: 'admin-challenging',
  'admin-challengingClass': 'active',
  'admin-playerClass': 'unactive',
  'admin-gameClass': 'unactive',

  actions: {
    setSection(section) {
      const oldSection = this.get('section');
      this.set(`${oldSection}Class`, 'unactive');
      this.set(`${section}Class`, 'active');
      this.set('section', section);
    },
    transitionToGame() {
      this.transitionToRoute('ladder');
    }
  }
});
