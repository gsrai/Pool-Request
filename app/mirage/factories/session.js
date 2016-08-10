import Mirage from 'ember-cli-mirage';

export function sessionHandler({ db }, request) {
  const body = JSON.parse(request.requestBody);
  const [ session ] = db.sessions.where({
    username: body.username,
    password: body.password
  });

  if (session) {
    return new Mirage.Response(200, {}, session);
  } else {
    return new Mirage.Response(401, {}, {
      globalErrors: ['service.security.authentication.failure-invalid-details']
    });
  }
}
