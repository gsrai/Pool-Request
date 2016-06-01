import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('person')
      .catch((error) => {
        return [Ember.Object.create({ error })];
      });
  }

});
