import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  this.get('/people', function() {
    return {
      data:
        [
          {
            type: 'person',
            id: 1,
            attributes: {
              name: 'Luke',
              challenging: null,
              wins: 3,
              losses: 0
            }
          }, {
            type: 'person',
            id: 2,
            attributes: {
              name: 'Sorin',
              challenging: 3,
              wins :2,
              losses: 1
            }
          }, {
            type: 'person',
            id: 3,
            attributes: {
              name: 'Gagondeep',
              challenging: 2,
              wins: 1,
              losses: 5
            }
          }, {
            type: 'person',
            id: 4,
            attributes: {
              name: 'Bradley',
              challenging: null,
              wins: 0,
              losses: 6
            }
          }
        ]
      };
    }
  );

  this.get('/games', function(db, request) {
    return {
      data: db.games.map(function(attributes, i) {
        return { type: 'game', id: (i + 1), attributes };
      })
    };
  });

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  this.post('/games', function(db, request) {
    var params = JSON.parse(request.requestBody).data.attributes;
    params.type = 'game';

    if (!params['name-one'] || !params['name-one']) {
      return new Mirage.Response(400, { a: 'header' }, { message: 'name cannot be blank' });
    } else {
      return {data: db.games.insert(params) };
    }
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

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
