import Ember from 'ember';

export default Ember.Controller.extend({
  section: 'admin-challenging',

  errorMessage: null,

  headers: Ember.computed(function() {
    return ['challenging', 'game', 'player'].map((header) => {
      return {
        name: header,
        section: `admin-${header}`
      };
    });
  }),

  onInit: Ember.on('init', function() {
    Ember.run.schedule('afterRender', this, () => {
      if (this.get('model.firstObject.error')) {
        this.send('setError', this.get('model.firstObject.error'));
      }
    });
  }),

  actions: {
    logout() {
    this.get('session').invalidate().then(() => {
      this.transitionToRoute('session');
    }).catch((error) => {
      this.sendAction('setError', error);
    });
    },
    setSection(section) {
      this.set('section', section);
      this.set('errorMessage', '');
    },
    transitionToGame() {
      this.transitionToRoute('ladder');
      this.set('errorMessage', '');
    },
    setError(error) {
      let message = error || error.message;
      this.set('errorMessage', message || '');
    }
  }
});
