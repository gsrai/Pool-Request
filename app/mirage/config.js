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

  // TODO copy logic into backend? Probably not the most performant solution
  // Doesn't know the swapping logic
  // Add a new user to the bottom
  // Updates their wins / losses
  this.get('/people', function(db) {
    let games = db.games;
    let people = [];

    games.forEach(function(game) {
      let isOneWinner = game['score-one'] > game['score-two'];
      let isOneAdded = false;
      let isTwoAdded = false;
      people.forEach(function(person) {
        if (!person.games) {
          person.games = {};
        }
        if (!person.frames) {
          person.frames = {};
        }
        if (person.name === game['name-one']) {
          if (isOneWinner) {
            person.games.wins++;
            person.frames.wins += game['score-one'];
          } else {
            person.games.losses++;
            person.frames.losses += game['score-one'];
          }
          isOneAdded = true;
        } else if (person.name === game['name-two']) {
          if (isOneWinner) {
            person.games.losses++;
            person.frames.losses += game['score-two'];
          } else {
            person.games.wins++;
            person.frames.wins += game['score-two'];
          }
          isTwoAdded = true;
        }
      });

      if (!isOneAdded) {
        let games = {};
        let frames = {};

        if (isOneWinner) {
          games.wins = 1;
          games.losses = 0;
          frames.wins = game['score-one'];
          frames.losses = game['score-two'];
        } else {
          games.wins = 0;
          games.losses = 1;
          frames.wins = game['score-two'];
          frames.losses = game['score-one'];
        }

        people.push({ name: game['name-one'], games, frames, challenging: null });
      }
      if (!isTwoAdded) {
        let games = {};
        let frames = {};

        if (isOneWinner) {
          games.wins = 1;
          games.losses = 0;
          frames.wins = game['score-two'];
          frames.losses = game['score-one'];
        } else {
          games.wins = 0;
          games.losses = 1;
          frames.wins = game['score-one'];
          frames.losses = game['score-two'];
        }

        people.push({ name: game['name-two'], games, frames, challenging: null });
      }
    });

    //Add fake challenging
    people[0].challenging = 2;
    people[2].challenging = 0;


    return {
      data: people.map(function(attributes, i) {
        return { type: 'person', id: (i + 1), attributes };
      })
      };
    }
  );

  this.get('/games', function(db) {
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
