import Ember from 'ember';
import Firebase from 'firebase';

let ref;

export default Ember.Controller.extend({
  section: 'admin-challenging',
  isAuthenticated: Ember.computed('authenticated', function() {
    return this.get('authenticated');
  }),
  onInit: Ember.on('init', function() {
    ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    let authData = ref.getAuth();

    this.set('authenticated', !!authData);
  }),
  authenticate(email, password) {
    ref.authWithPassword({
      email : email,
      password : password
    }, (error) => {
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
    ref.unauth();
    this.set('authenticated', false);
  },
  actions: {
    login() {
      let email = this.get('adminEmail');
      let password = this.get('adminPassword');
      this.authenticate(email, password);
    },
    logout() {
      this.unAuthenticate();
    },
    setSection(section) {
      this.set('section', section);
    },
    transitionToGame() {
      this.transitionToRoute('ladder');
    }
  }
});
