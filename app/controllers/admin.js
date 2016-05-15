import Ember from 'ember';
import Firebase from 'firebase';
import ENV from 'pool-request/config/environment';

let ref;
const IS_PROD = ENV.environment === 'production';

export default Ember.Controller.extend({
  section: 'admin-challenging',
  isAuthenticated: Ember.computed('authenticated', function() {
    return this.get('authenticated');
  }),
  onInit: Ember.on('init', function() {
    let authData;
    if (!IS_PROD) {
      authData = true;
    } else {
      ref = new Firebase("https://popping-heat-7651.firebaseio.com");
      authData = ref.getAuth();
    }

    this.set('authenticated', !!authData);
  }),
  authenticate(email, password) {
    if (IS_PROD) {
      ref.authWithPassword({
        email,
        password
      }, (error) => {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          this.set('authenticated', true);
        }
      }, {
        remember: "sessionOnly"
      });
    } else {
      this.set('authenticated', true);
    }
  },
  unAuthenticate() {
    if (IS_PROD) {
      ref.unauth();
    }
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
