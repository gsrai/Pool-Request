import Mirage from 'ember-cli-mirage';

export default function() {

  /**
   * GET
   */
  this.get('https://auth.firebase.com/v2/popping-heat-7651/auth/password', function() {
    // TODO fake login
    return {
      provider:"password",
      uid:"uid",
      token:"TODO",
      password:{"email":"ig.p00lrequest@gmail.com","isTemporaryPassword":false}
    };
  });

  this.get('/people', function(db) {
    return {
      data: db.people.map(function(attributes, i) {
        attributes.id = i + 1;
        return { type: 'person', id: i + 1, attributes };
      })
    };
  });

  this.get('/games', function(db) {
    return {
      data: db.games.map(function(attributes, i) {
        return { type: 'game', id: i, attributes };
      })
    };
  });

  /**
   * POST
   */
  this.post('/games', function(db, request) {
    var params = JSON.parse(request.requestBody).data.attributes;
    params.type = 'game';

    if (!params['name-one'] || !params['name-two']) {
      return new Mirage.Response(400, { a: 'header' }, { message: 'name cannot be blank' });
    }
    return { data: db.games.insert(params) };
  });

  this.post('/people', function(db, request) {
    var params = JSON.parse(request.requestBody).data.attributes;
    params.type = 'person';

    if (!params.name) {
      return new Mirage.Response(400, { a: 'header' }, { message: 'name cannot be blank'});
    }
    return { data: db.people.insert(params) };
  });

  this.patch('/people/:id', function(db, request) {
    var id = request.params.id;
    var params = JSON.parse(request.requestBody).data.attributes;
    params.type = 'person';

    return { data: db.people.update(id, params) };
  });
}
