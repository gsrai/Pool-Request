import Mirage from 'ember-cli-mirage';

export default function() {

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;

  /**
   * GET
   */
  this.get('/people', function(db) {
    return {
      data: db.people.map(function(attributes, i) {
        return { type: 'person', id: (i + 1), attributes };
      })
    };
  });

  this.get('/games', function(db) {
    return {
      data: db.games.map(function(attributes, i) {
        return { type: 'game', id: (i + 1), attributes };
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

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}
