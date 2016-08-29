import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  errorMessage: null,

  actions: {
    login() {
      this.get('session').authenticate('authenticator:firebase-simple-auth', 'firebase-simple-auth', {
        provider: 'password',
        email: this.get('adminEmail'),
        password: this.get('adminPassword')
      }).then(() => {
        this.set('errorMessage', null);
        this.transitionToRoute('admin');
      }).catch((error) => {
        this.set('errorMessage', error);
      });
    }
  }
});
