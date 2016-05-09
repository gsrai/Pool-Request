import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  section: 'admin-challenging',
  isAuthenticated: Ember.computed('authenticated', function() {
    return this.get('authenticated');
  }),
  onInit: Ember.on('init', function() {
    let ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    let authData = ref.getAuth();

    if (authData) {
      this.set('authenticated', true);
    } else {
      this.set('authenticated', false);
    }
  }),
  authenticate(email, password) {
    let ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    ref.authWithPassword({
      email : email,
      password : password
    }, (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        this.set('authenticated', true);
      }
    }, {
      remember: "sessionOnly"
    });
  },
  unAuthenticate() {
    let ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    ref.unauth();
    this.set('authenticated', false);
  },
  actions: {
    setSection() {
      this.send('setSection');
    },
    transitionToGame() {
      this.transitionToRoute('ladder');
    }
  }
});
