import Ember from 'ember';
import Firebase from 'firebase';
import ENV from 'pool-request/config/environment';

let ref;
const IS_PROD = ENV.environment === 'production';

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

  isAuthenticated: Ember.computed('authenticated', function() {
    return this.get('authenticated');
  }),
  onInit: Ember.on('init', function() {
    Ember.run.schedule('afterRender', this, () => {
      if (this.get('model.firstObject.error')) {
        this.send('setError', this.get('model.firstObject.error'));
      }
    });
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
    ref.authWithPassword({
      email,
      password
    }, (error) => {
    if (error) {
        this.send('setError', error);
      } else {
        this.set('authenticated', true);
      }
    }, {
      remember: "sessionOnly"
    })
    .catch((error) => this.send('setError', error));
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
      this.set('errorMessage', '');
    },
    transitionToGame() {
      this.transitionToRoute('ladder');
      this.set('errorMessage', '');
    },
    setError(error) {
      let message = error && error.message;
      this.set('errorMessage', message || '');
    }
  }
});
